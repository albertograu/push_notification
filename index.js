const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const path = require('path');

// Initialize Express Server
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

// VAPID Keys (Id's whose sending push notifications)
require('dotenv').config();
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// body-parser Middleware
app.use(bodyparser.json());

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object 
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({
        title: 'Caudalie USA'
    });

    // Pass object to sendNotification
    webpush.sendNotification(subscription, payload)
        .catch(err => console.error(err));
});


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));