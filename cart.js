import { db, auth, collection, addDoc } from "./firebase.js";

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", async () => {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = button.getAttribute("data-price");
        
        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to add items to the cart.");
            return;
        }

        try {
            await addDoc(collection(db, "carts", user.uid, "items"), {
                productId,
                productName,
                productPrice,
                quantity: 1
            });
            alert("Item added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    });
});
import { db, auth, collection, getDocs } from "./firebase.js";

async function loadCart() {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to view your cart.");
        return;
    }

    const cartRef = collection(db, "carts", user.uid, "items");
    const cartSnapshot = await getDocs(cartRef);

    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    cartSnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.productName} - $${data.productPrice}`;
        cartList.appendChild(li);
    });
}

window.onload = loadCart;
