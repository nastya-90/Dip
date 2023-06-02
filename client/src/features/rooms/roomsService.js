import axios from "axios";

const API_URI = "/api/rooms/";

const getRooms = async () => {
    const { data: res } = await axios.get(API_URI);
    return res.array;
};

const getAdminRooms = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    const { data: res } = await axios.get(API_URI + "getAdmin", config);

    return res.array;
};

const getRoom = async (token, id) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    const { data: res } = await axios.get(API_URI + `${id}`, config);

    console.log(res.item);

    return res.item;
};

const roomService = {
    getRooms,
    getAdminRooms,
    getRoom,
};

export default roomService;
