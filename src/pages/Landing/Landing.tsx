import React from 'react'
import styles from './Landing.module.scss'
import LandingGrid1 from '../../assets/Landing-grid-1.png'
import LandingGrid2 from '../../assets/Landing-grid-2.png'
import LandingGrid3 from '../../assets/Landing-grid-3.png'
import SideLine1 from '../../assets/landing-side-line-1.svg'
import SideLine2 from '../../assets/landing-side-line-2.svg'
import Underline from '../../assets/line-below.relocation.svg'
import { Link } from 'react-router-dom'
import { Typography, Box, Link as MuiLink } from '@mui/material'

type Props = {}

const Landing = (props: Props) => {
    return (
        <div className={styles.LandingPage}>
            <div className={styles.Right}>
                <div className={styles.Vector1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="726" height="942" viewBox="0 0 726 942" fill="none">
                        <path d="M7.6234 312.85L726 16L820.899 0L1048 734L30.0244 941.146C22.7098 942.635 15.8256 937.155 15.6355 929.693L0.210087 324.246C0.083536 319.279 3.03128 314.747 7.6234 312.85Z" fill="#FFF3EA" />
                    </svg>
                </div>
                <div className={styles.imgGrid}>
                    <img className={styles.Rectangle8} src={LandingGrid1} />
                    <img className={styles.Rectangle7} src={LandingGrid2} />
                    <img className={styles.Rectangle6} src={LandingGrid3} />
                </div>
                <div className={styles.gridVector}>
                    <div className={styles.Vector2}>
                        <img src={SideLine1} />
                    </div>
                    <div className={styles.Vector3}>
                        <img src={SideLine2} />
                    </div>
                </div>
            </div>

            <Box className={styles.Left}>
                <div className={styles.LineBelowExplore}>
                    <img src={Underline} />
                </div>
                <Typography variant='h2' fontWeight={600} className={styles.Tagline} lineHeight={1.3}>Explore The New World <br />With Tourbay</Typography>
                <Typography variant='subtitle1' fontSize={24} fontWeight={400} className={styles.Description} lineHeight={1.4}>
                    No matter where in the world you want to go, we<br />can help get you there and make your tour a <br />stupendous memory.
                </Typography>

                <MuiLink component={Link} to='/explore' underline='none' className={styles.ExploreNowBtn}>
                    <Typography fontSize={20} color={'white'}>Explore Now</Typography>
                </MuiLink>
            </Box>
        </div>
    )
}

export default Landing