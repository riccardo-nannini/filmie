function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function inputValidation(user) {
    if (user.email == undefined) return false;
    if (user.password == undefined) return false;
    if (user.name == undefined) return false;
    if (user.surname == undefined) return false;
    if (!validateEmail(user.email)) return false;
    if (String(user.password).length < 8) return false;
    if (String(user.password).search(/[0-9]/) < 0) return false;
    if (String(user.password).search(/[a-z]/) < 0) return false;
    if (String(user.password).search(/[A-Z]/) < 0) return false;
  
    return true;
  }

  module.exports = inputValidation;