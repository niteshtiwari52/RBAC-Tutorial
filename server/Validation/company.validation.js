const Joi = require("joi");

module.exports.companyRegistrationValidation = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).length(10).required(),  // Ensures phone is numeric and 10 digits
    email: Joi.string().email().required(),
    companyName: Joi.string().min(2).max(100).required(),
    employeeSize: Joi.string().required()  // You could also restrict this to specific values if needed (e.g., enum-like options)
});
