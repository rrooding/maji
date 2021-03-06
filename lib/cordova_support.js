// Generated by CoffeeScript 1.9.3
(function() {
  var $, bus, initCordova, publishOnBus;

  $ = require('jquery');

  bus = require('./bus');

  publishOnBus = function(e) {
    return bus.trigger("app:" + e.type);
  };

  initCordova = function() {
    var eventName, i, len, ref;
    $(document).on('deviceready', function() {
      return require('./cordova/ios_network_activity').init();
    });
    ref = ['pause', 'resume', 'backbutton', 'offline', 'online'];
    for (i = 0, len = ref.length; i < len; i++) {
      eventName = ref[i];
      $(document).on(eventName, function(e) {
        return publishOnBus(e);
      });
    }
    return $(function() {
      return $('body').addClass("platform-" + cordova.platformId);
    });
  };

  if (window.cordova) {
    initCordova();
  }

}).call(this);
