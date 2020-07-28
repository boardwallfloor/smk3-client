import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const myTheme = createMuiTheme({
    palette: {
    primary: green,
    secondary: {
      main: '#0288d1',
    },
  },
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