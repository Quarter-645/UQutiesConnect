
import { createTheme, colors, ThemeProvider } from '@mui/material'

// just before the app
const testTheme = createTheme({
    palette: {
        primary: {
            //main: colors.white[0]
            main: '#ffffff'
        },
        secondary: {
            main: '#b399dd' // Lightest purple
            // Purple hexes: 
            // #996FD6, #9E7CD7, #B399DD
            // Grey hexes:
            // #c6c6c6, #aaaaaa
        }
    }

})
export {testTheme};