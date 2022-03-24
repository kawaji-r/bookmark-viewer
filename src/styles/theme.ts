import { createTheme, responsiveFontSizes } from '@material-ui/core'

/* COLOR */
const black = '#343a40'
const white = '#F4F4F4'
const background = '#F4F4F4'

/* BREAKPOINTS */
const xl = 1920
const lg = 1280
const md = 960
const sm = 600
const xs = 0

/* SPACING */
const spacing = 8

/* FONT FAMILY */
const fontFamily = [
    'Poppins',
    '"Helvetica Neue"',
    'Arial',
    'Noto Sans JP',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
]

const theme = createTheme({
    palette: {
        primary: {
            main: '#69D2E7',
            light: '#B1E2EC',
            dark: '#51A4B5',
        },
        secondary: {
            main: '#FA6900',
            light: '#FDAD0D',
            dark: '#E3460B',
        },
        common: {
            black: '#343a40',
            white: '#F4F4F4',
        },
        info: {
            main: '#005CAF',
            light: '#0087FC',
            dark: '#00437D',
        },
        success: {
            main: '#00AA90',
            light: '#00F7D2',
            dark: '#007866',
        },
        warning: {
            main: '#FFB11B',
            light: '#FFDB0F',
            dark: '#E8820E',
        },
        error: {
            main: '#CB1B45',
            light: '#D55B78',
            dark: '#991433',
        },
        tonalOffset: 0.2,
        background: {
            default: background,
        },
    },
    spacing: spacing,
    breakpoints: {
        values: {
            xl,
            lg,
            md,
            sm,
            xs
        }
    },
    typography: {
        fontFamily: fontFamily.join(','),
    },
    overrides: {
        MuiToolbar: {
            root: {
                justifyContent: 'space-between'
            }
        },
    },
})

export default responsiveFontSizes(theme)
