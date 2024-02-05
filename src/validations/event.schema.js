const joi = require("joi");

module.exports = {
    // create event.
    createEventSchema: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        eventDate: joi.date().required(),
        location: joi.string().required(),
    }),
};
