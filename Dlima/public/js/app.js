(function () {
  "use strict";

  var STORAGE_KEY = "street-tees-cart-html";
  var WHATSAPP_NUMBER = "5515997861572";
  var loader = document.getElementById("loader");

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
})();
