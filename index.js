'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position-alt', function (opts) {
  opts = opts || {};

  var isUnit = function (value) {
    return (/\d/.test(value) || /^var|auto|inherit|initial|revert|center|calc/i.test(value));
  };

  return function (css, result) {
    css.walkDecls(/^(absolute|relative|fixed|top|right|bottom|left|z-index)/, function (decl) {

      var pos = [],
          isPositionType = /absolute|relative|fixed/.test(decl.prop),
          value = decl.value,
          m = void 0;

      if(isPositionType) {
        decl.value = decl.prop;
        decl.prop  = 'position';
      }


      if (/\s/.test(value)) { // multiple values, split with space

        var re = /(([\+\-]?[0-9\.]+)(%|px|pt|rem|em|in|cm|mm|ex|pc|vw|vh)?)|(calc\(([^\)]+)\))|(\-\-var\(([^\)]+)\))|(inherit|initial|revert|auto|center)/g,
            m = void 0;

        while ((m = re.exec(decl.value)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
          pos.push(m[0]);
        }
      }
      else if(!isPositionType){ // simple value (no space and not abs, rel, fixed prop)
        if(!isUnit(value)) { // (left: bottom)
          decl.value = '0';
          pos = [value];
          pos.push(value);
        }
        else{
          return; // no change needed (left: 12px)
        }
      }
      else {
        pos.push(value); // simple value (absolute: left)
      }


      var i    = 0,
          PROP = false,
          VAL  = false;

      if(!isPositionType) { 
        // if NOT abs, rel or fixed and first value isUnit (left: 1px right 2px)
        if(isUnit(pos[0])) {
          decl.value = pos[0];
          i++;
        }
        else { // (left: right 34px)
          decl.value = '0';
        }
      }

      while (i < 15) {
        
        if (i === 0 && pos[i] && pos[i] === 'full') {
          
          decl.cloneAfter({ prop: 'top',    value: '0' });
          decl.cloneAfter({ prop: 'right',  value: '0' });
          decl.cloneAfter({ prop: 'bottom', value: '0' });
          decl.cloneAfter({ prop: 'left',   value: '0' });
          i++;
        }
        else if (i === 0 && pos[i] && pos[i] === 'center') {
          
          decl.cloneAfter({ prop: 'top',   value: 'center' });
          decl.cloneAfter({ prop: 'left',  value: 'center' });
          i++;
        }
        else if (pos[i]) {
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

          VAL = VAL;

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
