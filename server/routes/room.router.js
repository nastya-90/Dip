const express = require("express");
const router = express.Router();

const {
    getAvailableRooms,
    getAllRooms,
    getRoom,
} = require("../controller/roomController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAvailableRooms);
router.get("/:id", protect, getRoom);
router.get("/getAdmin", protect, getAllRooms);

// router.post("/add", async (req, res) => {
//     try {
//         const array = req.body.rooms;

//         for (let room of array) {
//             await Room.create({ ...room });
//         }

//         return res.status(200).send({ message: "Everything is okey!" });
//     } catch (error) {
//         console.log(error);

//         res.status(400);
//         throw new Error("Invalid rooms data!");
//     }
// });

module.exports = router;
