const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema(
    {
        number: {
            type: Number,
            require: [true, "Please type a number"],
        },
        name: {
            type: String,
            require: [true, "Please type a name"],
            default: "Двухместный стандарт",
        },
        price: {
            type: Number,
            require: [true, "Please type a price"],
        },
        reserve: {
            status: {
                type: Boolean,
                require: [true, "Please select a reserve status"],
                default: false,
            },
            start: {
                type: Date,
                require: [false, "Please type a reserve date start"],
                default: null,
            },
            end: {
                type: Date,
                require: [false, "Please type a reserve date end"],
                default: null,
            },
        },
        // photo: {
        //     type: ,
        //     require: [true, "Please type a number"]
        // },
        info: {
            beds: {
                type: Number,
                require: [true, "Please type a number of beds"],
                default: 2,
            },
            room: {
                type: Number,
                require: [true, "Please number of rooms in the room"],
                default: 1,
            },
            area: {
                type: Number,
                require: [true, "Please type an area"],
                default: 22,
            },
            guests: {
                type: Number,
                require: [true, "Please type an amount of guests"],
                default: 2,
            },
            addition: {
                type: String,
                require: [true, "Please type an additional information"],
                default: "",
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Room", RoomSchema);
