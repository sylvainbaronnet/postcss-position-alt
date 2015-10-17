'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position-alt', function (opts) {
  opts = opts || {};

  return function (css, result) {

    css.walkDecls(/^absolute|relative|fixed/, function (decl) {

      var pos,
          value = decl.value;

      decl.value = decl.prop;
      decl.prop  = 'position';

      if (/\s/.test(value)) {
        pos = value.split(/\s/);
      }
      else {
        pos = [value];
      }

      var i    = 0,
          PROP = false,
          VAL  = false;

      while(i < 8) {

        if (pos[i]) {
          if (!PROP && !/\d/.test(pos[i])) {
            PROP = pos[i];
          }
          else {
            VAL = /\d/.test(pos[i]) ? pos[i] : '0';
          }
        }
        else if (PROP) {
          VAL = '0';
        }
        else {
          break;
        }

        if (PROP !== false && VAL !== false) {
          decl.cloneAfter({
            prop: PROP,
            value: VAL
          });

          PROP = false;
          VAL  = false;
        }

        i++;
      }

    });

  };
});
