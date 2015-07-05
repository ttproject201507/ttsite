(function() {
  'use strict';
  var ___ = require('worldcomponent');

  var port = 9999;
  var directory = 'www2';

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

  ___.world = ___.log('app-cs.js init');

  var wwwLoad = function(publicDir) {
    ___.world = ___.log("==== seek Dir ===");
    var publicObj = {};

    var seekDir = function(dir) {
      ___.world = ___.log(dir);
      fs.readdir(dir, function(err, dirA) {
        if (err) {
          var path0 = err.path;
          var path1 = path0.split(publicDir)[1];
          //  console.log(path1);

          fs.readFile(path0, function(err, file) {
            if (err) {
              ___.world = ___.log('fileLoadError!');
            } else {
              ___.world = ___.log("key is " + path1);
              publicObj[path1] = file;
            }
          });
        } else {
          var dummy = dirA.map(function(file) {
            seekDir(dir + "/" + file);
          });
        }
      });
    };

    seekDir(publicDir);

    return publicObj;
  };



  //======================================================


  var request = function(req, res) {
    /*
  var dir = path.join(__dirname, directory);
  var filepath = path.join(dir, unescape(uri));
  var indexfilepath = path.join(dir, unescape('index.html'));

  console.info('filepath', filepath);
*/

    var writeOut = function(contentKey) {
      res
        .writeHead(200, {
          'Content-Type': mimeTypes[path.extname(contentKey).split(".")[1]]
        });

      var content = publicObj[contentKey];
      res.end(content);

      return;
    };

    var uri = url.parse(req.url).pathname;
    ___.world = ___.log(uri);
    if (!publicObj[uri]) {
      ___.world = ___.log('no-file');
      writeOut('/index.html');
    } else {
      ___.world = ___.log('file');
      writeOut(uri);
    }

    return;
  };




  var serverUp = function() {
    console.info('console HTTP server listening', port);

  };


  setTimeout(function() {
    ___.world = ___.log('www2Loading');
    publicObj = wwwLoad(__dirname + "/" + directory);
  }, 0);

  setTimeout(function() {
    //=======Connect app0 DB 9000

    var socket9000 = require('socket.io-client')('http://localhost:9000');
    socket9000.on('connect', function() {
      ___.world = ___.log('connected to app0 DB 9000');
    });
    socket9000.on('event', function(data) {});
    socket9000.on('disconnect', function() {});

    //=========================================
    ___.world = ___.log('server starting');
    var server = http
      .createServer(request)
      .listen(port, serverUp);


    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.on('disconnect', function() {
        console.log('user disconnected');
      });
    });


    //=========================================
  }, 500);

}());