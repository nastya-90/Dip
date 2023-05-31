import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./roomsService";

const initialState = {
    rooms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createRoom = createAsyncThunk(
    "rooms/create",
    async (roomData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await roomService.createRoom(roomData, token);
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

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rooms.push(action.payload);
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
