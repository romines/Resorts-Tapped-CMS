/* eslint-env node */

const httpRequest = require('request');
const functions   = require('firebase-functions');
const config      = JSON.parse(process.env.FIREBASE_CONFIG);
// TODO update this to use prod credentials
const token       = functions.config().pushwoosh.development;
// const token       = config.projectId === 'resorts-tapped-admin' ? functions.config().pushwoosh.production : functions.config().pushwoosh.staging;

if (process.env.NODE_ENV === 'development') {
  token = functions.config().pushwoosh.development
}

module.exports = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Headers', "*")
  res.set('Access-Control-Allow-Methods', 'POST')

  if (!req.body.messageBody) {
    res.send('WTF');
  } else {

    let requestBody = {
      "request": {
        "application": "FD90D-D956E", // Jackson Dev
        "auth": token, // API access token from Pushwoosh Control Panel
        "notifications": [
          {
            "send_date": "now",  // required. YYYY-MM-DD HH:mm OR 'now'
            "content": req.body.messageBody
          }
        ]
      }
    }

    // Add geozone info
    if (req.body.geoZone.lat) {
      requestBody["request"]["notifications"][0]["geoZones"] = {
        "lat": req.body.geoZone.lat,
        "lng": req.body.geoZone.lng,
        "range": req.body.geoZone.range
      }
    }

    // Add selected cities info
    if (req.body.selectedCities && req.body.selectedCities.length > 0) {
      let array = [ ["City", "IN", req.body.selectedCities ] ]
      requestBody["request"]["notifications"][0]["conditions"] = array
    }

    // Add message link
    if (req.body.messageLink && req.body.messageLink.length > 0) {
      requestBody["request"]["notifications"][0]["link"] = req.body.messageLink
    }


    httpRequest.post({
      url: 'https://cp.pushwoosh.com/json/1.3/createMessage',
      json: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      res.status(200).send(response)
    })
  }



});
