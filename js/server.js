const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Example in-memory cart (you can use a database in a real app)
let cart = [];

// API to add item to cart
app.post('/api/add-to-cart', (req, res) => {
    const { productId, productName, productPrice, quantity } = req.body;

    if (!productId || quantity <= 0) {
        return res.status(400).send('Invalid product data');
    }

    const cartItem = { productId, productName, productPrice, quantity };
    cart.push(cartItem);

    // Save the cart in the session
    req.session.cart = cart;

    res.status(200).json({ message: 'Item added to cart', cart });
});

// API to get the current cart items
app.get('/api/cart', (req, res) => {
    res.json({ cart: req.session.cart || [] });
});

// Serve static files (e.g., your HTML pages, CSS, JS)
app.use(express.static('public'));

// Serve the cart page
app.get('/cart.html', (req, res) => {
    res.sendFile(__dirname + '/public/cart.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
