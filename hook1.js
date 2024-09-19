const express = require('express'); // Import express
const app = express(); // Initialize the app instance
app.use(express.json()); // Add this middleware to parse incoming JSON requests

const port = 3000;
const mysql = require('mysql2');
const axios = require('axios');

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Webhook verification
app.get('/webhook', (req, res) => {
    const verifyToken = 'theGenie'; // Your verify token

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === verifyToken) {
        console.log('Webhook verified!');
        res.status(200).send(challenge); // Webhook verified, send challenge back
    } else {
        console.log('Webhook verification failed!');
        res.sendStatus(403); // Verification failed
    }
});

// Webhook to receive WhatsApp messages
app.post('/webhook', (req, res) => {
    const message = req.body;
    console.log('Incoming WhatsApp message:', JSON.stringify(message, null, 2));

    if (message.entry && message.entry[0].changes && message.entry[0].changes[0].value.messages) {
        const phoneNumber = message.entry[0].changes[0].value.messages[0].from;
        const textMessage = message.entry[0].changes[0].value.messages[0].text.body;

        console.log(`Received message from ${phoneNumber}: ${textMessage}`);

        // Process the message here, e.g., trigger your /getVendors endpoint or other logic
    } else {
        console.log('No valid message data found.');
    }

    res.sendStatus(200); // Respond to WhatsApp with success
});
