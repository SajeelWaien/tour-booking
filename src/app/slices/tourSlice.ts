import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToursList } from "../../services";
import type { TourType } from "../../services/types";

interface TourSlice {
    tours: {
        entities: TourType[],
        status: 'idle' | 'pending' | 'succeeded' | 'failed'
    }
}

const initialState: TourSlice = {
    tours: {
        entities: [],
        status: 'idle'
    },

}

export const fetchTours = createAsyncThunk(
    'tours/fetchAll',
    async (_, thunkAPI) => {
        const response = await getToursList()
        return response.data
    }
)

const tourSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTours.fulfilled, (state, action) => {
            state.tours.entities = action.payload
            state.tours.status = 'succeeded'
        })
        builder.addCase(fetchTours.pending, (state, action) => {
            state.tours.status = 'pending'
        })
    }
})

export default tourSlice.reducer