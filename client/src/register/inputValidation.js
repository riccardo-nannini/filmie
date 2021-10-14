function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isInputValid(email, password) {
    if (!validateEmail(email)) {
        return ["Please insert a correct email address", false]
    }
    if (password.length < 8) {
        return ["Your password must be at least 8 characters long", false]
    }
    if (password.search(/[0-9]/) < 0) {
        return["Your password must contain a number", false]
    }
    if (password.search(/[a-z]/) < 0) {
        return["Your password must contain a lower-case letter", false]
    }
    if (password.search(/[A-Z]/) < 0) {
        return["Your password must contain an upper-case letter", false]
    }
    return ["", true]
}

module.exports = isInputValid;