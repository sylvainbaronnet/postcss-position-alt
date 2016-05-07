'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position-alt', function (opts) {
  opts = opts || {};

  var isUnit = function (value) {
    return (/\d/.test(value) || /^var|auto|inherit|initial|revert|center|calc/i.test(value));
  };

  var handleCalc = function(value) {
    
    if(!/\s/.test(value)) return value;

    return value.replace(/\s?\+\s?/g,'+')
                .replace(/\s\-\s/g,'-')
                .replace(/\s?\*\s?/g,'*')
                .replace(/\s?\/\s?/g,'/');
  };
  var handleCalcBack = function(value) {
    
    if(!/calc/.test(value)) return value;

    return value.replace(/\+/g, ' + ')
                .replace(/\-/g, ' - ')
                .replace(/\*/g, ' * ')
                .replace(/\//g, ' / ');
  };

  return function (css, result) {
    css.walkDecls(/^(absolute|relative|fixed|top|right|bottom|left|z-index)/, function (decl) {

      var pos,
          isPositionType = /absolute|relative|fixed/.test(decl.prop),
          value = handleCalc(decl.value);

      if(isPositionType) {
        decl.value = decl.prop;
        decl.prop  = 'position';
      }


      if (/\s/.test(value)) {
        pos = value.split(/\s/);
      }
      else if(!isPositionType){
        return; // simple value
      }
      else {
        pos = [value];
      }

      if(!isPositionType) {
        decl.value = isUnit(pos[0]) ? handleCalcBack(pos[0]) : '0';
      }

      var i    = 0,
          PROP = false,
          VAL  = false;

      if(!isPositionType && decl.value !== '0') i = 1;

      while (i < 14) {

        if (pos[i]) {
          if (!PROP && !isUnit(pos[i])) {
            PROP = pos[i];
            i++;
          }
          else if (isUnit(pos[i])) {
            VAL = pos[i];
            i++;
          }
          else {
            VAL = '0'
          }
        }
        else if (PROP) {
          VAL = '0';
        }
        else {
          break;
        }

        if (PROP !== false && VAL !== false) {

          if (PROP.length === 1) {
            
            PROP = PROP.replace(/t/i, 'top')
                       .replace(/l/i, 'left')
                       .replace(/b/i, 'bottom')
                       .replace(/r/i, 'right')
                       .replace(/z/i, 'z-index');
          }
          else if (PROP.length === 2) {
            PROP = PROP.replace(/zi/i, 'z-index'); // postcss-crip compatibility
          }

          VAL = handleCalcBack(VAL);

          decl.cloneAfter({
            prop: PROP,
            value: VAL
          });

          PROP = false;
          VAL  = false;
        }
      }

    });

  };
});
