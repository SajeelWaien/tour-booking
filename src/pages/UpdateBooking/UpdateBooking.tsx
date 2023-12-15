import { useEffect, useState } from 'react'
import styles from './UpdateBooking.module.scss'
import { Box, Typography, Snackbar, Alert } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { BookingType, addBooking, updateBooking } from '../../app/slices/bookingSlice'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { v4 as uuidv4 } from 'uuid';
import { fetchTours } from '../../app/slices/tourSlice'
import BookingForm from '../BookingForm/BookingForm'
import { useParams } from 'react-router-dom'

type Props = {}

const UpdateBooking = (props: Props) => {
    const { id } = useParams()
    const { bookings } = useAppSelector(state => state.bookings)

    const current = bookings.find(booking => booking.id == id)

    const form = useForm<BookingType>({
        values: current
    })
    const { handleSubmit, reset } = form
    const dispatch = useAppDispatch()
    const [notification, setNotification] = useState(false)

    useEffect(() => {
        dispatch(fetchTours())
    }, [])

    const onSubmit = (data: BookingType) => {
        const id = uuidv4()
        dispatch(updateBooking({ id, ...data }))
        setNotification(true)
    }

    return (
        <Box className={styles.Container}>
            <Box className={styles.FormContainer}>
                <Typography variant='h5' fontWeight={600} sx={{ marginBottom: 2 }}>Update Booking</Typography>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <BookingForm />
                    </form>
                </FormProvider>
            </Box>
            <Box className={styles.Image}>

            </Box>
            <Snackbar open={notification} onClose={() => setNotification(false)}><Alert>Your tour has been updated.</Alert></Snackbar>
        </Box>
    )
}

export default UpdateBooking