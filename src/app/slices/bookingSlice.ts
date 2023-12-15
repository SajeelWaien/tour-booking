import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PaymentEnum {
    card = "card",
    bank = "bank",
    paypal = "paypal",
}

export interface BookingType {
    id?: string
    name: string
    email: string
    phone: string
    num_adults: number
    num_children: number
    payment_method: PaymentEnum
    tour_id: number | string
}

interface BookingSlice {
    bookings: BookingType[]
}

const initialState: BookingSlice = {
    bookings: []

}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingType>) => {
            const isPresent = state.bookings.find((booking) => booking.tour_id == action.payload.tour_id)
            if(!isPresent) {
                state.bookings.push(action.payload)
            }
        },
        deleteBooking: (state, action: PayloadAction<string>) => {
            const filtered = state.bookings.filter((booking) => { return booking.id !== action.payload })

            state.bookings = filtered
        },
        updateBooking: (state, action: PayloadAction<BookingType>) => {
            const updated = state.bookings.map((booking) => {
                if(booking.id === action.payload.id) {
                    return action.payload
                } else {
                    return booking
                }
            })

            state.bookings = updated
        }
        
    }
})

export const { addBooking, deleteBooking, updateBooking } = bookingSlice.actions

export default bookingSlice.reducer