const asyncHandler = require("express-async-handler");
const Room = require("../models/Rooms");
const User = require("../models/User");

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

    console.log(rooms);

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

// @desc - Reserve available room
// @route - POST /api/rooms/reserve?roomId=roomId&userId=userId
// @access - Private
const reserveRoom = asyncHandler(async (req, res) => {
    try {
        const { userId, roomsId } = req.body.params;

        const user = await User.findById(userId);
        user.rooms.push(roomsId);
        user.save();

        const room = await Room.findById(roomsId);
        room.reserve.status = true;
        room.save();

        return res.status(200).send({
            isRent: true,
        });
    } catch (error) {
        return res.status(200).send({
            isRent: false,
        });
    }
});

// @desc - Unreserve reserved room
// @route - POST /api/rooms/unreserve?roomId=roomId&userId=userId
// @access - Private
const unreserveRoom = asyncHandler(async (req, res) => {
    try {
        const { userId, roomsId } = req.body.params;

        const user = await User.findById(userId);
        user.rooms.pull(roomsId);
        user.save();

        const room = await Room.findById(roomsId);
        room.reserve.status = false;
        room.save();

        return res.status(200).send({
            isRent: false,
        });
    } catch (error) {
        return res.status(200).send({
            isRent: true,
        });
    }
});

// @desc - Get rooms reserved by user id
// @route - GET /api/rooms/me?userId=id
// @access - Private
const getMyRooms = asyncHandler(async (req, res) => {
    const user = await User.findById(req.query.userId),
        rooms = [];

    for (let elId of user.rooms) {
        const room = await Room.findById(elId);
        room.photo = `./assets/${room.photo}.jpg`;
        rooms.push(room);
    }

    return res.status(200).send({
        array: rooms,
    });
});

module.exports = {
    getAvailableRooms,
    getAllRooms,
    getRoom,
    reserveRoom,
    unreserveRoom,
    getMyRooms,
};
