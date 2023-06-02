const asyncHandler = require("express-async-handler");
const Room = require("../models/Rooms");

// @desc - Get all available rooms
// @route - GET /api/rooms/
// @access - Public
const getAvailableRooms = asyncHandler(async (req, res) => {
    let rooms = await Room.find({});
    rooms = rooms.filter((el) => !el.reserve.status);

    for (let item of rooms) {
        item.photo = `./assets/${item.photo}.jpg`;
    }

    return res.status(200).send({
        array: rooms,
    });
});

// @desc - Get all available rooms
// @route - GET /api/rooms/
// @access - Public
const getAllRooms = asyncHandler(async (req, res) => {
    let rooms = await Room.find({});

    for (let item of rooms) {
        item.photo = `./assets/${item.photo}.jpg`;
    }

    return res.status(200).send({
        array: rooms,
    });
});

// @desc - Get all available rooms
// @route - GET /api/rooms/
// @access - Public
const getRoom = asyncHandler(async (req, res) => {
    try {
        let room = await Room.findById(req.params.id);
        room.photo = `./assets/${room.photo}.jpg`;

        return res.status(200).send({
            item: room,
        });
    } catch (error) {
        console.log(error);
    }
});

// @desc - Rent available room
// @route - GET /api/rooms/rent?id=id
// @access - Private
const RentRoom = asyncHandler(async (req, res) => {});

// @desc - Get user
// @route - GET /api/rooms/unrent?id=id
// @access - Private
const UnrentRoom = asyncHandler(async (req, res) => {});

module.exports = {
    getAvailableRooms,
    getAllRooms,
    getRoom,
};
