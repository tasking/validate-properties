/**
 * Tests for the presence or the format of the given props on the passed object.
 * @param {Object} obj
 * @param {Array} props - validates if the obj prop is valid
 * @param {Boolean} asArray - validates if any of the obj props is defined
 * @return {Boolean}
 */

module.exports = function validateProperties(obj, props = [], asArray) {
  let invalidProps = [];
  
  if (obj && props.length) {
    for (var i = 0; i < props.length; i++) {
      let valid = false;
      
      if (typeof props[i] === 'string') {
        valid = obj[props[i]] !== undefined && obj[props[i]] !== '';
      } else if (props[i].reduce) {
        valid = props[i].reduce((acc, prop) => acc || obj[prop] !== undefined, false);
      } else if (typeof props[i] === 'function') {
        valid = props[i](obj);
      }

      if (!valid) {
        invalidProps.push({ index: i, validation: props[i] });
        if (!asArray) {
          break;
        }
      }
    }
  }

  return (asArray)
    ? invalidProps
    : !invalidProps.length;
};
