const joi = require("joi");

module.exports = {
    // create event.
    createEventSchema: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        eventDate: joi.date().required(),
        location: joi.string().required(),
    }),

    // update event by user
    updateEventSchema: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        eventDate: joi.date().required(),
        location: joi.string().required(),
        images: joi
            .array()
            .items({
                isApproved: joi.boolean().required(),
                image: joi.string().required(),
            })
            .allow("", null),
    }),
};
