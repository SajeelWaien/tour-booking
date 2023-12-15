import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { locationList } from '../../services'
import type { LocationType, PriceType } from '../../services/types'

export const fetchLocations = createAsyncThunk(
    'locations/fetchByQuery',
    async (search: string, thunkAPI) => {
        const response = await locationList(search)
        return response.data.results
    }
)

interface LocationsState {
    entities: LocationType[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export interface CounterState {
    locations: LocationsState
    location: string
    date: {
        from: string | null
        to: string | null
    }
    price: PriceType
}

const initialState: CounterState = {
    locations: {
        entities: [],
        loading: 'idle'
    },
    location: '',
    date: {
        from: null,
        to: null,
    },
    price: {
        id: null,
        from: null,
        to: null,
    },
}

export const exploreSlice = createSlice({
    name: 'explore',
    initialState,
    reducers: {
        getLocations: (state, action: PayloadAction<string>) => {
            state.location = action.payload
        },
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload
        },
        setFromDate: (state, action: PayloadAction<string | null>) => {
            state.date.from = action.payload
        },
        setToDate: (state, action: PayloadAction<string | null>) => {
            state.date.to = action.payload
        },
        setPrice: (state, action: PayloadAction<PriceType>) => {
            state.price.id = action.payload.id
            state.price.from = action.payload.from
            state.price.to = action.payload.to
        },
        resetFilters: (state) => {
            state.location = initialState.location
            state.date = initialState.date
            state.price = initialState.price
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLocations.fulfilled, (state, action) => {
            state.locations.entities = action.payload
            state.locations.loading = 'succeeded'
        })
        builder.addCase(fetchLocations.pending, (state, action) => {
            state.locations.loading = 'pending'
        })
    },
})

// Action creators are generated for each case reducer function
export const { getLocations, setLocation, setFromDate, setToDate, setPrice, resetFilters} = exploreSlice.actions

export default exploreSlice.reducer