import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Image from '../../assets/landing-backdrop.jpg'
import { Stack, Box, Typography, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AttachMoney as MoneyIcon, AccessTime as TimeIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import styles from './TourCard.module.scss'

type ViewProps<T> = {
    id: string | number,
    edit?: T,
    title: string,
    description: string,
    price: string,
    startsIn: string
}

type EditProps<T> = {
    id: string | number,
    edit?: T,
    title: string,
    description: string,
    price: string,
    startsIn: string
    onDelete: (id: string | number) => void
    onUpdate: (id: string | number) => void
}

type Props<T> = T extends true ? EditProps<T> : ViewProps<T>

export default function MediaCard<T>(props: Props<T>) {
    const { id, title, edit, description, price, startsIn } = props

    return (
        <Card sx={{ maxWidth: 345 }} className={styles.Card}>
            <CardMedia
                sx={{ height: 140 }}
                image={Image}
                title="location image"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'block' }}>
                <Box className={styles.ActionButtons}>
                    { edit && <IconButton color='error' onClick={() => (props as EditProps<T>).onDelete(id)}><DeleteIcon /></IconButton> }
                    <Link to={`/tours/${id}`} style={{ textDecoration: 'none', width: '100%' }}><Button variant='contained' fullWidth>Details</Button></Link>
                    { edit && <Button variant='contained' onClick={() => (props as EditProps<T>).onUpdate(id)} fullWidth>Update</Button> }
                </Box>
                <Stack direction={'row'} gap={3} alignItems={'center'} className={styles.ActionInfo}>
                    <Stack direction={'row'} gap={0.4} alignItems={'center'}>
                        <MoneyIcon fontSize='inherit' color='action' />
                        <Box><Typography variant='caption' color={'text.secondary'} fontWeight={500} >{price}</Typography></Box>
                    </Stack>
                    <Stack direction={'row'} gap={0.4} alignItems={'center'}>
                        <TimeIcon fontSize='inherit' color='action' />
                        <Box><Typography variant='caption' color={'text.secondary'} fontWeight={500}>{startsIn}</Typography></Box>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
}