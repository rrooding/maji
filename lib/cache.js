// Generated by CoffeeScript 1.9.3
(function() {
  var CACHE_KEY_PREFIX, Cache, CacheItem;

  CACHE_KEY_PREFIX = 'cache:';

  CacheItem = (function() {
    function CacheItem(value1, ttl) {
      this.value = value1;
      this.expiresAt = new Date(new Date().getTime() + ttl * 1000);
    }

    return CacheItem;

  })();

  Cache = (function() {
    function Cache() {}

    Cache.prototype.set = function(key, value, arg) {
      var item, ttl;
      ttl = arg.ttl;
      item = new CacheItem(value, ttl);
      return localStorage.setItem(this._key(key), JSON.stringify(item));
    };

    Cache.prototype.get = function(key) {
      var ref;
      this._purgeExpiredItems();
      return ((ref = this._rawGet(this._key(key))) != null ? ref.value : void 0) || null;
    };

    Cache.prototype._rawGet = function(key) {
      var item;
      item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    };

    Cache.prototype._key = function(name) {
      return CACHE_KEY_PREFIX + name;
    };

    Cache.prototype._purgeExpiredItems = function() {
      return _.chain(Object.keys(localStorage)).filter(function(key) {
        return new RegExp("^" + CACHE_KEY_PREFIX).test(key);
      }).map((function(_this) {
        return function(key) {
          return [key, _this._rawGet(key)];
        };
      })(this)).filter(function(arg) {
        var item, key;
        key = arg[0], item = arg[1];
        return new Date(item.expiresAt) < new Date();
      }).each(function(arg) {
        var item, key;
        key = arg[0], item = arg[1];
        return localStorage.removeItem(key);
      });
    };

    return Cache;

  })();

  module.exports = new Cache();

}).call(this);
