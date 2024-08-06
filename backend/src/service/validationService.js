const validateInput = ({ accesscode, remember }) => {
    // Check if accesscode exists and is a string
   /* if (typeof accesscode !== number || accesscode.trim().length === 0) {
      return false;
    }*/
  
    // Check if accesscode is exactly 6 digits
    if (!/^\d{6}$/.test(accesscode)) {
      return false;
    }
  
    // Check if remember is a boolean
    if (typeof remember !== 'boolean') {
      return false;
    }
  
    // If all checks pass, return true
    return true;
  };
  
  module.exports = validateInput;
  