import Logo from '../../assets/logo.svg'
import styles from './Navbar.module.scss'
import { Container, List, ListItem, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
    let location = useLocation();

    return (
        <Container maxWidth='lg' className={styles.NavBg}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Link to={'/'}>
                    <div className="Group131" style={{ width: 85.66, height: 25.97, left: 0, top: 14 }}>
                        <img src={Logo} />
                    </div>
                </Link>
                <List className={styles.Links}>
                    <ListItem>
                        <MuiLink component={Link} to={'tours'} color={'text.primary'} underline='none'><Typography fontWeight={600} whiteSpace={'nowrap'}>Tours</Typography></MuiLink>
                    </ListItem>
                    <ListItem>
                        <MuiLink component={Link} to={'book-tour'} color={'text.primary'} underline='none'><Typography fontWeight={600} whiteSpace={'nowrap'}>Book Tour</Typography></MuiLink>
                    </ListItem>
                    <ListItem>
                        <MuiLink component={Link} to={'my-tours'} color={'text.primary'} underline='none'><Typography fontWeight={600} whiteSpace={'nowrap'}>My Tours</Typography></MuiLink>
                    </ListItem>
                </List>
                <MuiLink component={Link} to='/explore' underline='none' className={styles.ExploreNowBtn} sx={{ visibility: location.pathname === '/' ? 'visible' : 'hidden' }}>
                    <Typography fontSize={20} color={'white'}>Explore Now</Typography>
                </MuiLink>
            </Stack>
        </Container>
    )
}

export default Navbar