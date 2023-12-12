import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    point: 0,
}

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        updatePoint(state, action) {
            state.point = action.payload
        }
    }
})

export const { updatePoint } = pointSlice.actions;
export default pointSlice.reducer;