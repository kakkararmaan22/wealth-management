require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const app = express();
const cors = require('cors');
const twilio = require('twilio');

// Access credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.use(cors());
app.use(express.json());

app.post('/send-notification', (req, res) => {
  const to = req.body.to;
  const body = req.body.body;

  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER, // Use phone number from .env
      to: to,
      body: body,
    })
    .then((message) => {
      console.log(message.sid);
      res.send(`Notification sent to ${to}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending notification');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
