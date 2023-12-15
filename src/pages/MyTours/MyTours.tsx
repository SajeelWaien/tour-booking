import { useEffect, useState } from 'react'
import { Typography, Box, Container, Stack, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store'
import styles from './MyTours.module.scss'
import { TourCard } from '../../components/TourCard'
import { fetchTours } from '../../app/slices/tourSlice'
import dayjs from 'dayjs'
import type { TourType } from '../../services/types'
import NoData from '../../assets/no_data.svg'
import { deleteBooking } from '../../app/slices/bookingSlice'
import { useNavigate } from 'react-router-dom'
import { DeleteDialog } from '../../components/DeleteDialog'

type Props = {}

const Tours = (props: Props) => {
    const [deleteId, setDeleteId] = useState<string | number | null>(null)
    const { entities: tours, status } = useAppSelector((state) => state.tours.tours)
    const { bookings } = useAppSelector((state) => state.bookings)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTours())
    }, [])

    const filterTours = (tours: TourType[]) => {
        return tours.filter(tour => {
            return bookings.find((booking) => booking.tour_id == tour.id)
        })
    }

    const onDelete = (id: number | string) => {
        setDeleteId(id)
    }

    const confirmDelete = () => {
        const bookingId = bookings.find((booking) => booking.tour_id == deleteId)?.id
        bookingId && dispatch(deleteBooking(bookingId))
        setDeleteId(null)
    }

    const onUpdate = (id: number | string) => {
        const bookingId = bookings.find((booking) => booking.tour_id == id)?.id
        bookingId && navigate(`/update-booking/${bookingId}`)
    }

    const filteredTours = filterTours(tours)

    if (status === 'pending') {
        return (
            <Container maxWidth='xl'>
                <Typography variant='h2'>My Tours</Typography>
                <Box className={styles.TourGrid}>
                    <CircularProgress size={100} />
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth='xl'>
            <Typography variant='h2'>My Tours</Typography>
            {filteredTours.length <= 0 ?
                <Stack gap={3} alignItems={'center'} paddingTop={10}>
                    <img src={NoData} width={300} height={300} />
                    <Typography variant='h5' color={'text.secondary'}>You have booked no tours</Typography>
                </Stack> :
                <Box className={styles.TourGrid}>

                    {filteredTours.map((card) => {
                        return (
                            <TourCard
                                key={card.id}
                                id={card.id}
                                title={card.name}
                                edit
                                description={card.description}
                                price={`$${card.fromPrice}-$${card.toPrice}`}
                                startsIn={dayjs().to(card.starts)}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        )
                    })
                    }

                </Box>
            }
            <DeleteDialog open={Boolean(deleteId)} handleClose={() => setDeleteId(null)} handleAgree={confirmDelete} />
        </Container>
    )
}

export default Tours