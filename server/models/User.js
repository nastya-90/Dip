const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please add a name"],
        },
        email: {
            type: String,
            require: [true, "Please add an email"],
        },
        password: {
            type: String,
            require: [true, "Please add a password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
