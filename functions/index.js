const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const methodOverride = require('method-override');

const fcm = express()
fcm.use(cors({ origin: true }));
fcm.use(express.json());
fcm.use('/', router);
fcm.use(methodOverride())
fcm.use((request, response, err) => {
  response.status(400).json({
    error: err.message });
});

exports.fcm = functions.https.onRequest(fcm);