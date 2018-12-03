// libs
import { createMuiTheme } from '@material-ui/core/styles'

//TODO: Set the primary color in theme file to the blue color in design
//TODO: Set the secodary color too
export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#009688',
    },
  },
  typography: {
    htmlFontSize: 12,
  },
})
