const joi = require("joi");

module.exports = {
    // create event.
    createAdminEventSchema: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        eventDate: joi.date().required(),
        location: joi.string().required(),
    }),

    // update event by user
    updateAdminEventSchema: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        eventDate: joi.date().required(),
        location: joi.string().required(),
    }),
};
