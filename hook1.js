const express = require('express'); // Import express
const app = express(); // Initialize the app instance

// Add this middleware to parse incoming JSON requests
app.use(express.json()); 

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

// Define your routes here
app.get('/webhook', (req, res) => {
  const verifyToken = 'theGenie'; // Define your verify token

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verifyToken) {
    res.status(200).send(challenge); // Webhook verified
  } else {
    res.sendStatus(403); // Verification failed
  }
});

// You can add more routes as needed
