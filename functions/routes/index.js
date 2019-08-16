const admin = require('firebase-admin');
const express = require('express');
const Router = express.Router;
const router = Router();

//  Var for test purposes
const TOPIC = "pikachu";
// Subscribe to route via Devices FCM token, taken from PushNotification.js 
router.get('/subscribe/:fcmToken', async (request, response) => {
  try {
    const token = request.params.fcmToken;
    let registrationTokens = [];
    registrationTokens.push(token);
    let responseData = {
      status: null, 
      message: null,
      response: null,
    }

    const res = await admin.messaging().subscribeToTopic(registrationTokens, TOPIC);
    responseData.response = res;

    if(res.errors.length === 0 && res.successCount > 0) {
      responseData.status = 'Success';
      responseData.message = 'User successfully registered to push notifications'
    } else {
      responseData.status = 'Failure';
      responseData.message = res.errors[0].error.message;
    }

    console.log(responseData);
    response.send(responseData);
    
  } catch(error) {
    console.log(error)
    response.json({error});
  }
});

router.post('/notify', async (request, response) => {
  try {
    const title = request.body.title;
    const body = request.body.body;
    const message = {
      notification: {title, body},
      android: {
        ttl: 3600 * 1000,
        priority: 'High'
      },
      apns: {
        headers: {
          "apns-expiration": "1604750400",
          "apns-priority": "10"
        }
      },
      topic: TOPIC
    };

    const res = await admin.messaging().send(message);
    console.log(res);
    response.send(res);
    
  } catch(error) {
    console.log(error)
    response.json({error});
  }
});

module.exports = router;