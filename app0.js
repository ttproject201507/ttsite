(function() {
  'use strict';

  var port = 9000;

  var ___ = require('worldcomponent');

  setTimeout(function() {
    //=========================================

    var io = require('socket.io')(port);

    io.on('connection', function(socket) {
      console.log('a client connected');
      socket.on('disconnect', function() {
        console.log('the client disconnected');
      });
    });
    //=========================================
  }, 0);




}());