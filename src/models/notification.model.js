const { Schema, model } = require("mongoose");

//title, descrioption, images, date, location
const notificationSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Must provide title for the notifiaction."],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Must provide description for the notifiaction"],
        },
        seenBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);


const Notification = model("Notification", notificationSchema);

module.exports = Notification;
