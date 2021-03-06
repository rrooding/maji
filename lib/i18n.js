// Generated by CoffeeScript 1.9.3
(function() {
  var I18n;

  I18n = require('i18n-js');

  I18n.fallbacks = true;

  I18n.autoDetectLocale = function(arg) {
    var defaultLocale, language, locale, userLocale;
    defaultLocale = arg.defaultLocale;
    userLocale = navigator.userLanguage || navigator.language;
    I18n.defaultLocale = defaultLocale;
    if (userLocale in I18n.translations) {
      return I18n.locale = userLocale;
    }
    language = userLocale.match(/^[a-z]{2}/i)[0];
    for (locale in I18n.translations) {
      if (locale.match(/^[a-z]{2}/i)[0] === language) {
        return I18n.locale = locale;
      }
    }
    return I18n.locale = I18n.defaultLocale;
  };

  module.exports = I18n;

}).call(this);
