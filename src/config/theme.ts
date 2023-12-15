import { createTheme } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: deepOrange
    },
    typography: {
        fontFamily: 'poppins'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant === 'contained' &&
                        ownerState.color === 'primary' && {
                        color: '#fff',
                        borderRadius: 10,
                    }),
                }),
            }
        }
    },
    shape: {
        borderRadius: 10
    }
});

export default theme