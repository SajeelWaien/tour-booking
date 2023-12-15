import { useEffect } from 'react'
import { Typography, Box, Container, Stack, CircularProgress, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Tune as FilterIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../app/store'
import styles from './Tours.module.scss'
import { TourCard } from '../../components/TourCard'
import { fetchTours } from '../../app/slices/tourSlice'
import dayjs from 'dayjs'
import type { TourType } from '../../services/types'
import NoData from '../../assets/no_data.svg'

type Props = {}

const Tours = (props: Props) => {
    const { date, location, price } = useAppSelector((state) => state.explore)
    const { entities: tours, status } = useAppSelector((state) => state.tours.tours)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTours())
    }, [])

    const filterTours = (tours: TourType[]) => {
        return tours.filter(tour => {
            const isLocationEqual = location ? tour.location === location : true
            const isWithinDateRange = date.from && date.to ? dayjs(tour.starts).isBetween(dayjs(date.from), dayjs(date.to), null, '[]') || dayjs(tour.ends).isBetween(dayjs(date.from), dayjs(date.to), null, '[]') : true
            const isWithinPriceRange = price.from && price.to ? (tour.fromPrice >= price.from && tour.toPrice <= price.to) : true

            return isLocationEqual && isWithinDateRange && isWithinPriceRange
        })
    }


    const filteredTours = filterTours(tours)

    if (status === 'pending') {
        return (
            <Container maxWidth='xl'>
                <Typography variant='h2'>Top Destinations At "{location}"</Typography>
                <Box className={styles.TourGrid}>
                    <CircularProgress size={100} />
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth='xl'>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h2'>Top Destinations {location && `At "${location}"`}</Typography>
                <Link to='/explore'><Button startIcon={<FilterIcon />}>Filters</Button></Link>
            </Stack>
            {filteredTours.length <= 0 ?
                <Stack gap={3} alignItems={'center'} paddingTop={10}>
                    <img src={NoData} width={300} height={300} />
                    <Typography variant='h5' color={'text.secondary'}>Sorry, We didn’t find any tour right now at {location}</Typography>
                </Stack> :
                <Box className={styles.TourGrid}>

                    {filteredTours.map((card) => {
                        return (
                            <TourCard
                                id={card.id}
                                title={card.name}
                                description={card.description}
                                price={`$${card.fromPrice}-$${card.toPrice}`}
                                startsIn={dayjs().to(card.starts)}
                            />
                        )
                    })
                    }
                </Box>
            }
        </Container>
    )
}

export default Tours