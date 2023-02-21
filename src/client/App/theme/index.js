import { UbuntuFont } from 'client/App/theme/fonts';
import { createTheme } from '@mui/material/styles';

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

const theme = createTheme({
  palette: {
    success: {
      main: '#4caf50s'
    }
  },
  typography:{
    fontFamily: [UbuntuFont.fontFamily, ...systemFont].join(','),
    fontFamilySystem: systemFont.join(',')
  },
  components:{
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': UbuntuFont
      }
    }
  }
});

export default theme