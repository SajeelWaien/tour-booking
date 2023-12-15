import { useEffect, useState, useMemo } from 'react'
import styles from './AddBooking.module.scss'
import { Box, Typography, Snackbar, Alert } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { BookingType, addBooking } from '../../app/slices/bookingSlice'
import { useAppDispatch } from '../../app/store'
import { v4 as uuidv4 } from 'uuid';
import { fetchTours } from '../../app/slices/tourSlice'
import { BookingForm } from '../BookingForm'
import { useLocation } from 'react-router-dom'

type Props = {}

const AddBooking = (props: Props) => {
    // const { search } = useLocation();

    // const query = useMemo(() => new URLSearchParams(search), [search]);

    const form = useForm<BookingType>({
        mode: 'onChange',
    })
    const { handleSubmit, reset, setValue } = form
    const dispatch = useAppDispatch()
    const [notification, setNotification] = useState(false)


    useEffect(() => {
        dispatch(fetchTours())
    }, [])

    // useEffect(() => {
    //     console.log(query.get("id"))
    //     if (query.get("id")) {
    //         setValue('tour_id', String(query.get("id")))
    //     }
    // }, [query])


    const onSubmit = (data: BookingType) => {
        const id = uuidv4()
        dispatch(addBooking({ id, ...data }))
        reset()
        setNotification(true)
    }

    return (
        <Box className={styles.Container}>
            <Box className={styles.FormContainer}>
                <Typography variant='h5' fontWeight={600} sx={{ marginBottom: 2 }}>Confirm Your Booking</Typography>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <BookingForm />
                    </form>
                </FormProvider>
            </Box>
            <Box className={styles.Image}>

            </Box>
            <Snackbar open={notification} onClose={() => setNotification(false)}><Alert>Your tour has been booked.</Alert></Snackbar>
        </Box>
    )
}

export default AddBooking