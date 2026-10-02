(function () {
  "use strict";

  var endpointMeta = document.querySelector('meta[name="products-api-url"]');
  var endpoint = endpointMeta ? endpointMeta.content : "/api/produtos";
  var cacheKey = "dlima-products-cache-v1";
  var grid = document.getElementById("products-grid");
  var status = document.getElementById("products-status");
  var searchInput = document.getElementById("product-search");
  var categorySelect = document.getElementById("product-category");
  var retryButton = document.getElementById("products-retry");
  var products = loadCachedProducts();

  function formatPrice(priceCents) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(priceCents / 100);
  }

  function normalizeProduct(product) {
    if (!product || typeof product !== "object") return null;

    var id = product.id != null ? product.id : product._id;
    var name = product.name || product.nome;
    var rawCents = product.priceCents != null
      ? product.priceCents
      : product.precoCentavos;
    var rawPrice = product.price != null ? product.price : product.preco;
    var priceCents = rawCents != null
      ? Number(rawCents)
      : Math.round(Number(rawPrice) * 100);

    if (id == null || !name || !Number.isFinite(priceCents) || priceCents < 0) {
      return null;
    }

    return {
      id: String(id),
      name: String(name),
      model: String(product.model || product.modelo || ""),
      description: String(product.description || product.descricao || ""),
      category: String(product.category || product.categoria || "Outros"),
      imageUrl: String(product.imageUrl || product.imagemUrl || product.imagem || ""),
      sizes: Array.isArray(product.sizes) ? product.sizes : Array.isArray(product.tamanhos) ? product.tamanhos : [],
      priceCents: Math.round(priceCents)
    };
  }

  function loadCachedProducts() {
    try {
      var cached = JSON.parse(localStorage.getItem(cacheKey) || "[]");
      return Array.isArray(cached)
        ? cached.map(normalizeProduct).filter(Boolean)
        : [];
    } catch (error) {
      return [];
    }
  }

  function cacheProducts(items) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(items));
    } catch (error) {
      return;
    }
  }

  function updateCategories() {
    if (!categorySelect) return;

    var selectedCategory = categorySelect.value;
    var categories = Array.from(new Set(products.map(function (product) {
      return product.category;
    }))).sort(function (first, second) {
      return first.localeCompare(second, "pt-BR");
    });

    categorySelect.replaceChildren(new Option("Todas as categorias", ""));
    categories.forEach(function (category) {
      categorySelect.add(new Option(category, category));
    });

    if (categories.includes(selectedCategory)) {
      categorySelect.value = selectedCategory;
    }
  }

  function createProductCard(product) {
    var item = document.createElement("li");
    var card = document.createElement("article");
    card.className = "card product-card";

    var media = document.createElement("div");
    media.className = "card__media";
    if (product.imageUrl) {
      var image = document.createElement("img");
      image.className = "product-card__image";
      image.src = product.imageUrl;
      image.alt = product.name;
      image.loading = "lazy";
      image.width = 600;
      image.height = 750;
      image.addEventListener("error", function () {
        var placeholder = document.createElement("div");
        placeholder.className = "product-card__placeholder";
        placeholder.textContent = "Imagem indisponível";
        image.replaceWith(placeholder);
      }, { once: true });
      media.appendChild(image);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "product-card__placeholder";
      placeholder.textContent = "Sem imagem";
      media.appendChild(placeholder);
    }

    var body = document.createElement("div");
    body.className = "card__body";

    var category = document.createElement("p");
    category.className = "card__model";
    category.textContent = product.model || product.category;

    var title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = product.name;

    body.append(category, title);

    if (product.description) {
      var description = document.createElement("p");
      description.className = "card__desc";
      description.textContent = product.description;
      body.appendChild(description);
    }

    var footer = document.createElement("div");
    footer.className = "card__footer";
    var price = document.createElement("span");
    price.className = "card__price";
    price.textContent = formatPrice(product.priceCents);

    var detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "btn btn--primary";
    detailsButton.textContent = "Ver detalhes";
    detailsButton.addEventListener("click", function () {
      if (window.DlimaProductModal) window.DlimaProductModal.open(product);
    });

    footer.append(price, detailsButton);
    body.appendChild(footer);
    card.append(media, body);
    item.appendChild(card);
    return item;
  }

  function renderProducts() {
    if (!grid || !status) return;

    var search = searchInput ? searchInput.value.trim().toLocaleLowerCase("pt-BR") : "";
    var selectedCategory = categorySelect ? categorySelect.value : "";
    var filteredProducts = products.filter(function (product) {
      var searchableText = [product.name, product.model, product.description, product.category]
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return (!search || searchableText.includes(search)) &&
        (!selectedCategory || product.category === selectedCategory);
    });

    grid.replaceChildren();
    filteredProducts.forEach(function (product) {
      grid.appendChild(createProductCard(product));
    });

    if (products.length === 0) {
      status.textContent = "Nenhum produto cadastrado ainda.";
    } else if (filteredProducts.length === 0) {
      status.textContent = "Nenhum produto corresponde aos filtros.";
    } else {
      status.textContent = filteredProducts.length +
        (filteredProducts.length === 1 ? " produto" : " produtos");
    }
  }

  async function loadProducts() {
    if (!grid || !status) return;

    status.textContent = products.length > 0
      ? "Atualizando produtos..."
      : "Carregando produtos...";
    status.setAttribute("aria-busy", "true");
    if (retryButton) retryButton.hidden = true;

    try {
      var response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!response.ok) throw new Error("HTTP " + response.status);

      var payload = await response.json();
      var records = Array.isArray(payload)
        ? payload
        : payload.products || payload.produtos || payload.data;
      if (!Array.isArray(records)) throw new Error("Resposta inválida");

      products = records.map(normalizeProduct).filter(Boolean);
      cacheProducts(products);
      updateCategories();
      renderProducts();
    } catch (error) {
      status.textContent = products.length > 0
        ? "Não foi possível atualizar. Exibindo produtos salvos."
        : "Não foi possível carregar os produtos do servidor.";
      if (retryButton) retryButton.hidden = false;
    } finally {
      status.setAttribute("aria-busy", "false");
    }
  }

  if (searchInput) searchInput.addEventListener("input", renderProducts);
  if (categorySelect) categorySelect.addEventListener("change", renderProducts);
  if (retryButton) retryButton.addEventListener("click", loadProducts);

  if (products.length > 0) {
    updateCategories();
    renderProducts();
  }

  loadProducts();
})();
