import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCounter, incrementCounter } from "../../services/counterApi";

export const loadCounter = createAsyncThunk(
    "counter/load",
    async () => fetchCounter()
);

export const increaseAsync = createAsyncThunk(
    "counter/increment",
    async () => incrementCounter()
);

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadCounter.fulfilled, (state, action) => {
            state.value = action.payload.value;
        });
        builder.addCase(increaseAsync.fulfilled, (state, action) => {
            state.value = action.payload.value;
        });
    },
});

export default counterSlice.reducer;
