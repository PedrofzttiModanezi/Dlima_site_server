(function () {
  "use strict";

  var STORAGE_KEY = "street-tees-cart-html";
  var WHATSAPP_NUMBER = "5515997861572";
  var loader = document.getElementById("loader");
  var heroVideo = document.getElementById("hero-video");
  var comingSoonGrid = document.getElementById("coming-soon-products");
  var comingSoonStatus = document.getElementById("coming-soon-status");

  if (heroVideo) {
    heroVideo.play().catch(function () {});
  }

  function hideLoader() {
    if (loader) loader.classList.add("hidden");
  }

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 500);
  } else {
    window.addEventListener("load", function () {
      window.setTimeout(hideLoader, 500);
    }, { once: true });
  }
  window.setTimeout(hideLoader, 2500);

  var revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("active");
    });
  }

  var openButton = document.getElementById("btn-open-cart");
  var closeButton = document.getElementById("btn-close-cart");
  var backdrop = document.getElementById("cart-backdrop");
  var drawer = document.getElementById("cart-drawer");
  var linesElement = document.getElementById("cart-lines");
  var badge = document.getElementById("cart-badge");
  var subtotalElement = document.getElementById("cart-subtotal");
  var clearButton = document.getElementById("btn-clear-cart");
  var checkoutButton = document.getElementById("btn-checkout");
  var checkoutMessage = document.getElementById("checkout-msg");
  var cart = loadCart();

  function loadCart() {
    try {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter(function (item) {
        return item && typeof item.productId === "string" &&
          typeof item.name === "string" && Number.isInteger(item.priceCents) &&
          Number.isInteger(item.quantity) && item.quantity > 0;
      });
    } catch (error) {
      return [];
    }
  }

  function formatPrice(cents) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(cents / 100);
  }

  function createProductModal() {
    var modal = document.createElement("div");
    modal.className = "product-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "product-modal-title");

    var backdrop = document.createElement("div");
    backdrop.className = "product-modal__backdrop";
    var panel = document.createElement("div");
    panel.className = "product-modal__panel";
    panel.tabIndex = -1;

    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "product-modal__close";
    closeButton.setAttribute("aria-label", "Fechar detalhes do produto");
    closeButton.textContent = "×";

    var body = document.createElement("div");
    body.className = "product-modal__body";
    var media = document.createElement("div");
    media.className = "product-modal__media";
    var image = document.createElement("img");
    image.className = "product-modal__image";
    image.alt = "";
    var imageFallback = document.createElement("div");
    imageFallback.className = "product-modal__image-fallback";
    imageFallback.textContent = "Imagem indisponível";
    imageFallback.hidden = true;
    image.addEventListener("error", function () {
      image.hidden = true;
      imageFallback.hidden = false;
    }, { once: true });
    media.append(image, imageFallback);

    var content = document.createElement("div");
    content.className = "product-modal__content";
    var model = document.createElement("p");
    model.className = "product-modal__model";
    var title = document.createElement("h2");
    title.className = "product-modal__title";
    title.id = "product-modal-title";
    var description = document.createElement("p");
    description.className = "product-modal__desc";
    var sizesHeading = document.createElement("p");
    sizesHeading.className = "product-modal__size-heading";
    sizesHeading.textContent = "Tamanhos disponíveis";
    var sizesMessage = document.createElement("p");
    sizesMessage.className = "product-modal__size";
    var sizes = document.createElement("div");
    sizes.className = "product-modal__sizes";
    sizes.setAttribute("role", "group");
    sizes.setAttribute("aria-label", "Tamanhos disponíveis");
    var price = document.createElement("p");
    price.className = "product-modal__price";
    var addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn btn--primary product-modal__add";
    addButton.textContent = "Adicionar ao carrinho";
    content.append(model, title, description, sizesHeading, sizesMessage, sizes, price, addButton);
    body.append(media, content);
    panel.append(closeButton, body);
    modal.append(backdrop, panel);
    document.body.appendChild(modal);

    var productAtual = null;
    var tamanhoSelecionado = null;
    var focoAnterior = null;
    var overflowAnterior = "";

    function fechar() {
      modal.hidden = true;
      document.body.style.overflow = overflowAnterior;
      if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
    }

    function abrir(product) {
      var rawSizes = product.sizes !== undefined ? product.sizes : product.tamanhos;
      var availableSizes = Array.isArray(rawSizes)
        ? rawSizes
        : typeof rawSizes === "string" ? rawSizes.split(",") : [];
      availableSizes = Array.from(new Set(availableSizes.map(function (size) {
        return String(size).trim();
      }).filter(Boolean)));

      productAtual = {
        id: product.id,
        name: product.name || product.nome || "Produto",
        model: product.model || product.modelo || "",
        description: product.description || product.descricao || "",
        imageUrl: product.imageUrl || product.imagemUrl || "",
        priceCents: product.priceCents != null
          ? Number(product.priceCents)
          : Math.round(Number(product.preco) * 100)
      };
      tamanhoSelecionado = null;
      focoAnterior = document.activeElement;
      overflowAnterior = document.body.style.overflow;

      image.src = productAtual.imageUrl;
      image.alt = productAtual.name;
      image.hidden = !productAtual.imageUrl;
      imageFallback.hidden = Boolean(productAtual.imageUrl);
      imageFallback.textContent = productAtual.imageUrl ? "Imagem indisponível" : "Sem imagem cadastrada";
      model.textContent = productAtual.model;
      model.hidden = !productAtual.model;
      title.textContent = productAtual.name;
      description.textContent = productAtual.description;
      description.hidden = !productAtual.description;
      price.textContent = formatPrice(productAtual.priceCents);
      sizes.replaceChildren();
      sizesMessage.textContent = availableSizes.length
        ? "Selecione um tamanho"
        : "Tamanhos não cadastrados. Informe-os pelo admin.";
      addButton.textContent = "Adicionar ao carrinho";

      availableSizes.forEach(function (size) {
        var sizeButton = document.createElement("button");
        sizeButton.type = "button";
        sizeButton.className = "product-modal__size";
        sizeButton.textContent = size;
        sizeButton.setAttribute("aria-pressed", "false");
        sizeButton.addEventListener("click", function () {
          tamanhoSelecionado = size;
          Array.from(sizes.children).forEach(function (option) {
            var active = option === sizeButton;
            option.classList.toggle("product-modal__size--active", active);
            option.setAttribute("aria-pressed", String(active));
          });
          sizesMessage.textContent = "Tamanho selecionado: " + size;
        });
        sizes.appendChild(sizeButton);
      });

      modal.hidden = false;
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    addButton.addEventListener("click", function () {
      if (!productAtual || (sizes.children.length > 0 && !tamanhoSelecionado)) {
        sizesMessage.textContent = "Selecione um tamanho para continuar.";
        return;
      }
      if (!window.DlimaCart || !window.DlimaCart.addItem) return;

      var added = window.DlimaCart.addItem({
        id: productAtual.id,
        name: productAtual.name,
        model: productAtual.model,
        priceCents: productAtual.priceCents,
        imageUrl: productAtual.imageUrl,
        size: tamanhoSelecionado
      });
      if (added) addButton.textContent = "Adicionado ao carrinho";
    });

    closeButton.addEventListener("click", fechar);
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target === backdrop) fechar();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) fechar();
    });

    return { open: abrir };
  }

  window.DlimaProductModal = createProductModal();

  function createComingSoonCard(product) {
    var item = document.createElement("li");
    var card = document.createElement("article");
    card.className = "card product-card";

    var media = document.createElement("div");
    media.className = "card__media";
    var image = document.createElement("img");
    image.className = "product-card__image";
    image.src = product.imagemUrl || "";
    image.alt = product.nome;
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

    var body = document.createElement("div");
    body.className = "card__body";
    var model = document.createElement("p");
    model.className = "card__model";
    model.textContent = product.modelo || "Novo lançamento";
    var title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = product.nome;
    body.append(model, title);

    if (product.descricao) {
      var description = document.createElement("p");
      description.className = "card__desc";
      description.textContent = product.descricao;
      body.appendChild(description);
    }

    var footer = document.createElement("div");
    footer.className = "card__footer";
    var price = document.createElement("span");
    price.className = "card__price";
    var priceCents = Math.round(Number(product.preco) * 100);
    price.textContent = formatPrice(priceCents);

    var detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "btn btn--primary";
    detailsButton.textContent = "Ver detalhes";
    detailsButton.addEventListener("click", function () {
      window.DlimaProductModal.open(product);
    });

    footer.append(price, detailsButton);
    body.appendChild(footer);
    card.append(media, body);
    item.appendChild(card);
    return item;
  }

  async function loadComingSoonProducts() {
    if (!comingSoonGrid || !comingSoonStatus) return;

    try {
      var response = await fetch("/api/produtos", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Não foi possível carregar as novidades.");

      var catalog = await response.json();
      var products = Array.isArray(catalog.produtos) ? catalog.produtos : [];
      var comingSoonProducts = products.filter(function (product) {
        return String(product.categoria || "").trim().toLocaleLowerCase("pt-BR") === "em breve";
      });

      comingSoonGrid.replaceChildren();
      comingSoonProducts.forEach(function (product) {
        comingSoonGrid.appendChild(createComingSoonCard(product));
      });
      comingSoonStatus.textContent = comingSoonProducts.length === 0
        ? "Nenhum produto em breve cadastrado."
        : "";
    } catch (error) {
      comingSoonStatus.textContent = error.message || "Não foi possível carregar as novidades.";
    }
  }

  function itemCount() {
    return cart.reduce(function (count, item) {
      return count + item.quantity;
    }, 0);
  }

  function subtotal() {
    return cart.reduce(function (total, item) {
      return total + item.priceCents * item.quantity;
    }, 0);
  }

  function persistCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      if (checkoutMessage) {
        checkoutMessage.hidden = false;
        checkoutMessage.textContent = "Não foi possível salvar o carrinho neste navegador.";
      }
    }
    renderCart();
  }

  function createButton(label, action, className) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("data-action", action);
    if (className) button.className = className;
    return button;
  }

  function renderCart() {
    if (!linesElement || !badge || !subtotalElement) return;

    var count = itemCount();
    badge.hidden = count === 0;
    badge.textContent = count > 99 ? "99+" : String(count);
    subtotalElement.textContent = formatPrice(subtotal());
    if (clearButton) clearButton.disabled = count === 0;
    if (checkoutButton) checkoutButton.disabled = count === 0;

    linesElement.replaceChildren();
    if (cart.length === 0) {
      var emptyMessage = document.createElement("p");
      emptyMessage.className = "cart-drawer__empty";
      emptyMessage.textContent = "Seu carrinho está vazio. As novidades chegam em breve.";
      linesElement.appendChild(emptyMessage);
      return;
    }

    var list = document.createElement("ul");
    list.className = "cart-lines";

    cart.forEach(function (item) {
      var row = document.createElement("li");
      row.className = "cart-line";

      if (item.imageUrl) {
        var thumb = document.createElement("div");
        thumb.className = "cart-line__thumb";
        var image = document.createElement("img");
        image.src = item.imageUrl;
        image.alt = "";
        image.width = 64;
        image.height = 80;
        thumb.appendChild(image);
        row.appendChild(thumb);
      }

      var info = document.createElement("div");
      info.className = "cart-line__info";
      var name = document.createElement("p");
      name.className = "cart-line__name";
      name.textContent = item.name;
      info.appendChild(name);

      if (item.model) {
        var model = document.createElement("p");
        model.className = "cart-line__model";
        model.textContent = item.model;
        info.appendChild(model);
      }

      if (item.size) {
        var size = document.createElement("p");
        size.className = "cart-line__size";
        size.textContent = "Tamanho: " + item.size;
        info.appendChild(size);
      }

      var price = document.createElement("p");
      price.className = "cart-line__unit";
      price.textContent = formatPrice(item.priceCents) + " · unidade";
      info.appendChild(price);

      var controls = document.createElement("div");
      controls.className = "cart-line__controls";
      var quantity = document.createElement("div");
      quantity.className = "qty";
      var decrease = createButton("−", "decrease");
      var quantityValue = document.createElement("span");
      quantityValue.textContent = String(item.quantity);
      quantityValue.setAttribute("aria-label", "Quantidade: " + item.quantity);
      var increase = createButton("+", "increase");
      [decrease, increase].forEach(function (button) {
        button.setAttribute("data-product-id", item.productId);
        button.setAttribute("data-size", item.size || "");
      });
      quantity.append(decrease, quantityValue, increase);

      var remove = createButton("Remover", "remove", "cart-line__remove");
      remove.setAttribute("data-product-id", item.productId);
      remove.setAttribute("data-size", item.size || "");
      controls.append(quantity, remove);
      info.appendChild(controls);
      row.appendChild(info);
      list.appendChild(row);
    });

    linesElement.appendChild(list);
  }

  function openCart() {
    if (!drawer || !backdrop) return;
    drawer.hidden = false;
    backdrop.hidden = false;
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (checkoutMessage) checkoutMessage.hidden = true;
    if (closeButton) closeButton.focus();
  }

  function closeCart() {
    if (!drawer || !backdrop) return;
    drawer.hidden = true;
    backdrop.hidden = true;
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (openButton) openButton.focus();
  }

  function clearCart() {
    cart = [];
    persistCart();
    if (checkoutMessage) checkoutMessage.hidden = true;
  }

  function addItem(item) {
    if (!item || item.id == null || !item.name || !Number.isInteger(item.priceCents) || item.priceCents < 0) {
      return false;
    }

    var productId = String(item.id);
    var size = item.size ? String(item.size) : null;
    var existing = cart.find(function (line) {
      return line.productId === productId && line.size === size;
    });

    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + (item.quantity || 1));
    } else {
      cart.push({
        productId: productId,
        name: String(item.name),
        model: item.model ? String(item.model) : "",
        priceCents: item.priceCents,
        imageUrl: item.imageUrl ? String(item.imageUrl) : "",
        size: size,
        quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1))
      });
    }

    persistCart();
    return true;
  }

  function findLine(productId, size) {
    return cart.find(function (item) {
      return item.productId === productId && (item.size || "") === size;
    });
  }

  if (openButton) openButton.addEventListener("click", openCart);
  if (closeButton) closeButton.addEventListener("click", closeCart);
  if (backdrop) backdrop.addEventListener("click", closeCart);
  if (clearButton) clearButton.addEventListener("click", clearCart);

  if (linesElement) {
    linesElement.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button) return;

      var productId = button.getAttribute("data-product-id");
      var size = button.getAttribute("data-size") || "";
      var item = findLine(productId, size);
      if (!item) return;

      var action = button.getAttribute("data-action");
      if (action === "remove" || (action === "decrease" && item.quantity === 1)) {
        cart = cart.filter(function (line) {
          return line !== item;
        });
      } else if (action === "increase") {
        item.quantity = Math.min(99, item.quantity + 1);
      } else if (action === "decrease") {
        item.quantity -= 1;
      }
      persistCart();
    });
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      if (cart.length === 0) return;
      var message = ["Olá, gostaria de fazer um pedido:", ""];
      cart.forEach(function (item, index) {
        message.push((index + 1) + ". " + item.quantity + "x " + item.name + " - " +
          formatPrice(item.priceCents * item.quantity));
      });
      message.push("", "Subtotal: " + formatPrice(subtotal()));
      window.location.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" +
        encodeURIComponent(message.join("\n"));
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer && !drawer.hidden) closeCart();
  });

  window.DlimaCart = {
    addItem: addItem,
    open: openCart,
    close: closeCart,
    clear: clearCart
  };

  renderCart();
  loadComingSoonProducts();
})();
