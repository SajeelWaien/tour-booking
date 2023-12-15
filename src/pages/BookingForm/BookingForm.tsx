import { useMemo, useEffect } from 'react'
import styles from './BookingForm.module.scss'
import { Box, FormControl, InputLabel, TextField, Select, MenuItem, Button } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { BookingType, PaymentEnum } from '../../app/slices/bookingSlice'
import { useAppSelector } from '../../app/store'
import { useLocation } from 'react-router-dom'


type Props = {}

const BookingForm = (props: Props) => {
    const { register, control, formState: { errors }, trigger } = useFormContext<BookingType>()
    const { entities: tours } = useAppSelector((state) => state.tours.tours)
    const { search } = useLocation();

    const query = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        trigger()
    }, [])


    return (

        <Box className={styles.Form}>
            <TextField variant='outlined' label='Name' sx={{ gridColumn: 'span 2' }} {...register("name", { required: true })} />
            <TextField variant='outlined' label='Email' sx={{ gridColumn: 'span 2' }} {...register("email", { required: true })} />
            <TextField variant='outlined' label='Phone' sx={{ gridColumn: 'span 2' }} {...register("phone", { required: true })} />
            <TextField variant='outlined' type='number' label='Number of Adults' {...register("num_adults", { required: true })} />
            <TextField variant='outlined' type='number' label='Number of Children' {...register("num_children", { required: true })} />
            <FormControl variant='outlined' sx={{ gridColumn: 'span 2' }} >
                <InputLabel id="payment">Payment Method</InputLabel>
                <Controller
                    name="payment_method"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Select label='Payment Method' {...field}>
                            <MenuItem value={PaymentEnum.card}>Card</MenuItem>
                            <MenuItem value={PaymentEnum.bank}>Bank</MenuItem>
                            <MenuItem value={PaymentEnum.paypal}>Paypal</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
            <FormControl variant='outlined' sx={{ gridColumn: 'span 2' }} >
                <InputLabel id="payment">Tour</InputLabel>
                <Controller
                    name="tour_id"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Select label='Tour' {...field} defaultValue={query.get("id")}>
                            {tours.map(tour => <MenuItem value={tour.id}>{tour.name}</MenuItem>)}
                        </Select>
                    )}
                />
            </FormControl>
            <Button type='submit' variant='contained' disabled={Object.values(errors).length > 0} sx={{ gridColumn: 'span 2' }}>Confirm</Button>
        </Box>

    )
}

export default BookingForm