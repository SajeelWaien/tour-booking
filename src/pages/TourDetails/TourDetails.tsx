import { useParams } from 'react-router-dom'
import { Container, Typography, Stack, Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material'
import { AttachMoney as MoneyIcon, AccessTime as TimeIcon, LocationOn as LocationIcon, CheckCircle as CheckIcon } from '@mui/icons-material';
import { useAppSelector } from '../../app/store';
import dayjs from 'dayjs'
import styles from './TourDetails.module.scss'
import GridImage1 from '../../assets/tour-details/grid-img-1.png'
import GridImage2 from '../../assets/tour-details/grid-img-2.png'
import GridImage3 from '../../assets/tour-details/grid-img-3.png'
import GridImage4 from '../../assets/tour-details/grid-img-4.png'
import GridImage5 from '../../assets/tour-details/grid-img-5.png'
import { ItinerarySlide, SlideShow } from '../../components/ItinerarySlide';
import { Link } from 'react-router-dom'

const facilities = [
    ['Destination', 'Miami'],
    ['Departure Location', '2000 Brush St, Detroit, MI 48226, United States'],
    ['Return', '7:00 PM on Day 3'],
    ['Facilities', [
        'Basic first aid kit',
        'Comfortable Private Booked Transport',
        'Fuel Expense',
        'Mess Tent',
        'Kitchen Utensils, and Cook',
        'Detail Guided Maps',
        'Waterproof Tents on twin/triple Sharing']
    ]
]

type Props = {}

const TourDetails = (props: Props) => {
    const { id } = useParams()
    // const { date, location, price } = useAppSelector((state) => state.explore)
    const { entities: tours } = useAppSelector((state) => state.tours.tours)

    const current = tours.find((tour) => {
        if (id)
            return +tour.id === +id
    })

    if (current) {

        const { id: tourId, name, location, fromPrice, toPrice, starts, description } = current

        return (
            <Container maxWidth='xl' className={styles.Container}>
                <Typography variant='h6' fontWeight={600}>{name}</Typography>

                <Stack direction={'row'} gap={3} alignItems={'center'} marginTop={1}>
                    <Stack direction={'row'} gap={0.4} alignItems={'center'}>
                        <LocationIcon fontSize='inherit' color='action' />
                        <Box><Typography variant='caption' color={'text.secondary'} fontWeight={500} >{location}</Typography></Box>
                    </Stack>
                    <Stack direction={'row'} gap={0.4} alignItems={'center'}>
                        <MoneyIcon fontSize='inherit' color='action' />
                        <Box><Typography variant='caption' color={'text.secondary'} fontWeight={500} >{`$${fromPrice}-$${toPrice}`}</Typography></Box>
                    </Stack>
                    <Stack direction={'row'} gap={0.4} alignItems={'center'}>
                        <TimeIcon fontSize='inherit' color='action' />
                        <Box><Typography variant='caption' color={'text.secondary'} fontWeight={500}>{dayjs().to(starts)}</Typography></Box>
                    </Stack>
                </Stack>

                <Box className={styles.ImgGrid}>
                    <img src={GridImage1} className={styles.HeroImage} />
                    <img src={GridImage2} />
                    <img src={GridImage3} />
                    <img src={GridImage4} />
                    <img src={GridImage5} />
                </Box>
                <Box marginTop={5}>
                    <Typography variant='body1'>{description}</Typography>
                </Box>
                <Box marginTop={5}>
                    <Typography variant='h6' fontWeight={600}>What's included</Typography>
                    <Box className={styles.WhatsIncludedGrid} marginTop={3}>
                        {facilities.map(facility => {
                            if (facility[0] === 'Facilities' && Array.isArray(facility[1])) {
                                return (
                                    <>
                                        <Box className={styles.Facility}>
                                            <Typography variant='body2' fontWeight={600}>{facility[0]}</Typography>
                                        </Box>
                                        <Box className={styles.FacilityList}>
                                            {facility[1].map((ele) => (
                                                <ListItem dense disablePadding>
                                                    <ListItemIcon>
                                                        <CheckIcon fontSize='inherit' color='primary' />
                                                    </ListItemIcon>
                                                    <ListItemText primary={ele} />
                                                </ListItem>
                                            ))}
                                        </Box>
                                    </>
                                )
                            }
                            return (
                                <>
                                    <Box className={styles.Facility}>
                                        <Typography variant='body2' fontWeight={600}>{facility[0]}</Typography>
                                    </Box>
                                    <Box className={styles.Facility}>
                                        <Typography variant='body2'>{facility[1]}</Typography>
                                    </Box>
                                </>
                            )
                        })}
                    </Box>
                </Box>
                <Box my={5} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>Itinerary Schedule</Typography>
                    <SlideShow>
                        <ItinerarySlide />
                        <ItinerarySlide />
                        <ItinerarySlide />
                    </SlideShow>
                    <Link to={`/book-tour?id=${tourId}`} style={{ textDecoration: 'none' }}><Button variant='contained' color='primary' sx={{ margin: 'auto' }}>Book Now</Button></Link>
                </Box>
            </Container>
        )
    }
}

export default TourDetails