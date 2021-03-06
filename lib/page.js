// Generated by CoffeeScript 1.9.3
(function() {
  var Marionette, Page,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Marionette = require('backbone.marionette');

  Page = (function(superClass) {
    extend(Page, superClass);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.transition = 'slide';

    Page.prototype.className = 'page';

    Page.prototype.canGoBack = function() {
      return this._parent.canGoBack();
    };

    Page.prototype.transitionBack = function(route, options) {
      return this._parent.goBack(route, options);
    };

    Page.prototype.transitionHome = function(route, transition) {
      return this._parent.goHome(route, transition);
    };

    return Page;

  })(Marionette.Layout);

  module.exports = Page;

}).call(this);
