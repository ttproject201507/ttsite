"use strict";

var ___ = require('worldcomponent');

var port = 9999;
var directory = 'www';

var http = require('http');
var url = require('url');
var path = require("path");
var fs = require('fs');

var mimeTypes = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "gif": "image/gif",
  "svg": "image/svg",
  "ico": "image/vnd.microsoft.icon"
    // more
};


var publicObj;

___.world = ___.log('app.js init');

var wwwLoad = function(publicDir)
{
  ___.world = ___.log("==== seek Dir ===");
  var publicObj = {};

  var seekDir = function(dir)
  {
    ___.world = ___.log(dir);
    fs.readdir(dir, function(err, dirA)
    {
      if (err)
      {
        var path0 = err.path;
        var path1 = path0.split(publicDir)[1];
        //  console.log(path1);

        fs.readFile(path0, function(err, file)
        {
          if (err)
          {
            ___.world = ___.log('fileLoadError!');
          }
          else
          {
              ___.world = ___.log("key is "+ path1);
            publicObj[path1] = file;
          }
        });
      }
      else
      {
        var dummy = dirA.map(function(file)
        {
          seekDir(dir + "/" + file);
        });
      }
    });
  }

  seekDir(publicDir);

  return publicObj;
};



//======================================================


var request = function(req, res)
{

  /*
  var dir = path.join(__dirname, directory);
  var filepath = path.join(dir, unescape(uri));
  var indexfilepath = path.join(dir, unescape('index.html'));

  console.info('filepath', filepath);
*/

  var writeOut = function(contentKey)
  {
    res
      .writeHead(200,
      {
        'Content-Type': mimeTypes[path.extname(contentKey).split(".")[1]]
      });

    var content = publicObj[contentKey];
    res.end(content);

    return;
  };

  var uri = url.parse(req.url).pathname;
  ___.world = ___.log(uri);
  if (!publicObj[uri])
  {
    ___.world = ___.log('no-file');

    writeOut('index.html');
  }
  else
  {
    ___.world = ___.log('file');
    writeOut(uri);
  }

  return;
};

var serverUp = function()
{
  console.info('HTTP server listening', port);
  return;
};



//===================================================================

var io = require('socket.io')(http);


io.on('connection', function(socket)
{
  console.log('a user connected');
});

//===================================================================

/**
 * Creating a custom PayPal payment/checkout experience and creating a
 * payment with it by using the returned id as experience_profile_id in
 * the payment json
 *
 * Copyright 2015 PayPal
 */

/*
var paypal = require('paypal-rest-sdk');

paypal.configure(
{
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ASnbcxMey3h0Hqyxoj2WfBUiZWZLO_yqIOyb6I9fLkuJA4RqGOQ2LJ6xE00WX4-0ELL12FP7CBptJrkV',
  'client_secret': 'EDUp3M0I3cuvFUbM_n7Vy0_76kDVwy_KJBJMKJGUy7400N0SoyXQyaBgIVKLxe-SN1JChsssVUHKWFGL'
});

//Name needs to be unique so just generating a random one
var profile_name = Math.random().toString(36).substring(7); //'TrustyTrading201507'

var create_web_profile_json = {
  "name": profile_name,
  "presentation":
  {
    "brand_name": "Trusty Trading",
    "logo_image": "https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_mc_vs_dc_ae.jpg",
    "locale_code": "US"
  },
  "input_fields":
  {
    "allow_note": true,
    "no_shipping": 1,
    "address_override": 0
  },
  "flow_config":
  {
    "landing_page_type": "billing"
  }
};

var create_payment_json = {
  "intent": "sale",
  "payer":
  {
    "payment_method": "paypal",
    "payer_info":
    {
      "email": "bbuyer@example.com",
      "first_name": "Betsy",
      "last_name": "Buyer",
      "payer_id": "CR87QHB7JTRSC"
    }

  },
  "redirect_urls":
  {
    "return_url": "http://return.url",
    "cancel_url": "http://cancel.url"
  },
  "transactions": [
  {
    "item_list":
    {
      "items": [
        {
          "name": "NikonD5500",
          "sku": "itemID",
          "price": "499.00",
          "currency": "USD",
          "quantity": 1
        },
        {
          "name": "NikonD200",
          "sku": "itemID",
          "price": "1.00",
          "currency": "USD",
          "quantity": 1
        }

      ]
    },
    "amount":
    {
      "currency": "USD",
      "total": "520.00",
      "details":
      {
        "subtotal": "500.00",
        "tax": "0.00",
        "shipping": "20.00"
      }
    },
    "description": "This is the payment description."
  }]
};









paypal.webProfile.create(create_web_profile_json, function(error, web_profile)
{
  if (error)
  {
    throw error;
  }
  else
  {

    //Set the id of the created payment experience in payment json
    var experience_profile_id = web_profile.id;
    create_payment_json.experience_profile_id = experience_profile_id;

    paypal.payment.create(create_payment_json, function(error, payment)
    {
      if (error)
      {
        throw error;
      }
      else
      {
        console.log("Create Payment Response");
        console.log(payment);
      }
    });
  }
});
*/



setTimeout(function()
{
  ___.world = ___.log('wwwLoading');
  publicObj = wwwLoad(__dirname + "/www");
}, 0);

setTimeout(function()
{
  ___.world = ___.log('server starting');
  var server = http
    .createServer(request)
    .listen(port, serverUp);
}, 500);
