// Function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to render cart items in the payment page
function renderCartItems() {
    let cartItems = getCartItems();
    let orderSummaryTable = document.getElementById('order-summary-table');
    let totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;

    // If cart is empty
    if (cartItems.length === 0) {
        orderSummaryTable.innerHTML = '<tr><td colspan="2">Your cart is empty.</td></tr>';
        totalAmountElement.innerText = '$0.00';
        return;
    }

    // Clear previous cart items (if any)
    orderSummaryTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Price</th>
        </tr>
    `;

    // Loop through the cart items and add them to the table
    cartItems.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
        `;
        orderSummaryTable.appendChild(row);
        totalAmount += parseFloat(item.price);
    });

    // Update the total amount
    totalAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
}

// Handle form submission
function handlePayment(event) {
    event.preventDefault(); // Prevent page refresh

    // Get the values from the form
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;

    // Payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Simulate payment processing
    alert(`Payment details submitted:\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}, ${city}, ${zip}, ${country}\nPayment Method: ${paymentMethod}`);

    // Optionally clear the cart after successful payment
    localStorage.removeItem('cart');

    // Redirect to a confirmation page or reset form
    window.location.href = "confirmation.html"; // Redirect to a payment confirmation page
}

// Add event listener to handle payment submission
document.addEventListener('DOMContentLoaded', function () {
    renderCartItems(); // Render the cart items as soon as the page loads

    const paymentForm = document.querySelector('.billing-info form');
    paymentForm.addEventListener('submit', handlePayment);
});


document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.querySelector('.billing-info form'); // Get the form
    const payNowButton = document.querySelector('.submit-payment'); // Get the Pay Now button

    // Function to validate the billing information form
    function validatePaymentForm(event) {
        event.preventDefault(); // Prevent form submission if validation fails

        // Get all required form fields
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        const country = document.getElementById('country').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Validate that all fields are filled
        if (!fullName || !email || !address || !city || !zip || !country || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all the details to proceed with the payment.");
            return; // Stop the function if any field is missing
        }

        // Simulate successful payment (in a real-world scenario, here is where payment processing happens)
        alert(`Payment successful!\n\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}\nCity: ${city}\nZip: ${zip}\nCountry: ${country}\nPayment Method: Credit/Debit Card\nCard Number: ${cardNumber}\nExpiry Date: ${expiryDate}`);

        // Clear the cart after payment (optional)
        localStorage.removeItem('cart');
        
        // Redirect to a confirmation page (or reset form)
        window.location.href = "homepage.html"; // Redirect to a payment confirmation page
    }

    // Add event listener to handle payment submission
    if (paymentForm) {
        // Ensure that the click on the "Pay Now" button triggers the payment validation
        payNowButton.addEventListener('click', validatePaymentForm); // Use validatePaymentForm to handle the submit event
    }
});
