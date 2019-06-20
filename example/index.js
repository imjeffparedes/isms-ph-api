"use strict";


const ISMSPH = require("../lib");

var client = new ISMSPH({
    username: 'jeffcomgtech',
    password: 'p@$$w0rd'
});


client.sendMessage({
        dstno: '+639054044313',
        msg: 'Hello World',
        sendid: 'Loadwallet',
        agreedterm: 'YES',
        type: 1
    }, (err, data) => {
    console.log(err || data);
});
