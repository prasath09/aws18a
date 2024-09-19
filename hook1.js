app.use(express.json()); // Add this middleware to parse incoming JSON requests

// Webhook verification
app.get('/webhook', (req, res) => {
  const verifyToken = 'theGenie'; // Choose your verify token

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verifyToken) {
    res.status(200).send(challenge); // Webhook verified
  } else {
    res.sendStatus(403); // Verification failed
  }
});

// Webhook to receive WhatsApp messages
app.post('/webhook', (req, res) => {
  const message = req.body;

  console.log('Incoming WhatsApp message:', message);

  // Process the incoming message
  if (message.entry && message.entry[0].changes && message.entry[0].changes[0].value.messages) {
    const phoneNumber = message.entry[0].changes[0].value.messages[0].from;
    const textMessage = message.entry[0].changes[0].value.messages[0].text.body;

    console.log(`Received message from ${phoneNumber}: ${textMessage}`);

    // Process the message here, e.g., trigger your /getVendors endpoint
  }

  res.sendStatus(200); // Respond to WhatsApp with success
});
