const axios = require('axios');
const {Base64} = require('js-base64');
const totpGenerator = require('hotp-totp-generator');

// JSON with my data
const myJSON = {
  "github_url": "https://github.com/lga-dev/hennge-challenge",
  "contact_email": "lga-dev@hotmail.com"
}

// API challenge URL
const url = "https://api.challenge.hennge.com/challenges/003";
// For the userid of HTTP Basic Authentication, use the same email address you put in the JSON string
const userid = myJSON.contact_email;
// For the password, provide a 10-digit time-based one time password conforming to RFC6238 TOTP
// TOTP's Time Step X is 30 seconds. T0 is 0
// Use HMAC-SHA-512 for the hash function, instead of the default HMAC-SHA-1
// Token shared secret is the userid followed by ASCII string value "HENNGECHALLENGE003" (not including double quotations)
const password = totpGenerator.totp({
  digits: 10,
  X: 30,
  T0: 0,
  algorithm: 'sha512',
  key: userid+"HENNGECHALLENGE003"
});
// Encoded version of (userid:password) to something like (QWxhZGRpbjpvcGVuIHNlc2FtZQ==)
let stringEncoded = Base64.encode(`${userid}:${password}`);
const sendPostRequest = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Basic " + stringEncoded
      }
    }
    const response = await axios.post(url, myJSON, config);
    console.log(response);
  }
  catch (error) {
    console.log(error);
  }
}

sendPostRequest();