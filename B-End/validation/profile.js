var Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateCompleteProfile(data) {
    let errors = {};

    // data.bio = !Validator.isEmpty(data.bio) ? data.bio : '';
    // data.designation = !Validator.isEmpty(data.designation) ? data.designation : '';
    // data.company = !Validator.isEmpty(data.company) ? data.company : '';
    // data.experience = !Validator.isEmpty(data.experience) ? data.experience : '';
    // data.industry = !Validator.isEmpty(data.industry) ? data.industry : '';
    // data.location = !Validator.isEmpty(data.location) ? data.location : '';

    if (Validator.isEmpty(data.bio)) {
        errors.bio = 'Bio is invalid';
    }

    if (Validator.isEmpty(data.designation)) {
        errors.designation = 'Designation field is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company name field is required';
    }

    if (Validator.isEmpty(data.experience)) {
        errors.experience = 'Experience is required';
    }

    if (Validator.isEmpty(data.industry)) {
        errors.industry = 'Industry field is required';
    }

    if (Validator.isEmpty(data.location)) {
        errors.location = 'Location name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};