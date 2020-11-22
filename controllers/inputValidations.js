const validator = require("email-validator");

const validateEmailAndTitle = (email, title) => {
    if (!email || !title) {
		return false;
    }
    if (!validator.validate(email)) {
        return false;
    }
    return true;
}

const validateIDIsPresent = (id) => {
    if (!id) {
        return false;
    }
    return true;
}

module.exports = {
    validateEmailAndTitle,
    validateIDIsPresent
}