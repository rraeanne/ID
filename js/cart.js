document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const clearCartButton = document.getElementById("clear-cart");

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
        } else {
            emptyCartMessage.style.display = "none";
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    function addToCart(event) {
        if (event.target.classList.contains("add-to-cart")) {
            const fragranceItem = event.target.closest(".fragrance-item");
            const name = fragranceItem.getAttribute("data-name");
            const price = fragranceItem.getAttribute("data-price");
            const image = fragranceItem.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name, price, image });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        }
    }

    function removeFromCart(event) {
        if (event.target.classList.contains("remove-item")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const itemIndex = event.target.getAttribute("data-index");
            cart.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    }

    function clearCart() {
        localStorage.removeItem("cart");
        loadCart();
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", removeFromCart);
        clearCartButton.addEventListener("click", clearCart);
        loadCart();
    }

    if (document.querySelector(".fragrance-grid")) {
        document.querySelector(".fragrance-grid").addEventListener("click", addToCart);
    }
});
