import axios from "axios";

const API_URI = "/api/rooms/";

//Create room
const createRoom = async (roomData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data: res } = await axios.post(
        API_URI + "create",
        roomData,
        config
    );

    return res;
};

const roomService = {
    createRoom,
};

export default roomService;
