import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/rooms/roomsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomReducer,
    },
});
