import { PropsWithChildren } from 'react'
import { Box, Stack, Typography, List, ListItem, ListItemText } from '@mui/material'
import { WbSunnyOutlined as SunnyIcon } from '@mui/icons-material'
import styles from './ItinerarySlide.module.scss'

type Props = {}

export const SlideShow = ({ children }: PropsWithChildren) => {
    return (
        <Box className={styles.WeatherSlideShow}>
            {children}
        </Box>
    )
}

const ItinerarySlide = (props: Props) => {
    return (
        <Box className={styles.Slide}>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography variant='subtitle1'>Day 1</Typography>
                <Stack direction={'row'} gap={1}>
                    <SunnyIcon color='inherit' />
                    <Typography variant='subtitle1'>18°C</Typography>
                </Stack>
            </Stack>
            <List dense className={styles.ItineraryList}>
                <ListItem disableGutters><ListItemText primary='Tours with American Sign Language' /></ListItem>
                <ListItem disableGutters><ListItemText primary='Audio description group tours' /></ListItem>
                <ListItem disableGutters><ListItemText primary='Large-print gallery notes' /></ListItem>
                <ListItem disableGutters><ListItemText primary='Lunch Included' /></ListItem>
            </List>
        </Box>
    )
}

export default ItinerarySlide