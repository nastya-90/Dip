import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./roomsService";

const initialState = {
    rooms: [],
    allRooms: [],
    room: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get all rooms
export const getRooms = createAsyncThunk("room/user", async (_, thunkAPI) => {
    try {
        return await roomService.getRooms();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.String();

        return thunkAPI.rejectWithValue(message);
    }
});

// Get all rooms
export const getAdminRooms = createAsyncThunk(
    "room/admin",
    async (_, thunkAPI) => {
        try {
            return await roomService.getAdminRooms(
                JSON.parse(localStorage.getItem("user")).token
            );
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.String();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all rooms
export const getRoom = createAsyncThunk("room/id", async (id, thunkAPI) => {
    try {
        console.log(id);
        return await roomService.getRoom(
            JSON.parse(localStorage.getItem("user")).token,
            id
        );
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.String();

        return thunkAPI.rejectWithValue(message);
    }
});

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rooms = action.payload;
            })
            .addCase(getRooms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAdminRooms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminRooms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allRooms = action.payload;
            })
            .addCase(getAdminRooms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.room = action.payload;
            })
            .addCase(getRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
