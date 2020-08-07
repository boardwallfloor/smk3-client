import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const myTheme = createMuiTheme({
    palette: {
    primary: green,
    secondary: {
      main: '#0288d1',
    },
  },
        //   "primary1Color": "#43a047",
        // "accent1Color": "#8bc34a",
        // "primary2Color": "#388e3c",
        // "primary3Color": "#c8e6c9"
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
    },
});

export default myTheme;