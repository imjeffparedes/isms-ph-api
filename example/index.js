"use strict";


const ISMSPH = require("../lib");

var client = new ISMSPH({
    username: process.env.ISMS_USERNAME
  , password: process.env.ISMS_PASSWORD
    // This is optional
  , host: process.env.ISMS_HOST || "https://www.isms.com.my/"
});


client.sendMessage({
        dstno: '+639012345678',
        msg: 'Hello World',
        sendid: 'MyId',
        agreedterm: 'YES',
        type: 1
    }, (err, data) => {
    console.log(err || data);
});
