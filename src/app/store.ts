import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import exploreReducer from './slices/exploreSlice'
import tourReducer from './slices/tourSlice'
import bookingReducer from './slices/bookingSlice'

export const store = configureStore({
  reducer: {
    explore: exploreReducer,
    tours: tourReducer,
    bookings: bookingReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector