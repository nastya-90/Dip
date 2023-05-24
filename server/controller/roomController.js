const asyncHandler = require("express-async-handler");
const Room = require("../models/Rooms");

// @desc - Get user
// @route - GET /api/users/data
// @access - Private

const getData = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(201).json({
        _id: _id,
        name: name,
        email: email,
    });
});

module.exports = {
    registerUser,
    loginUser,
    getData,
};
