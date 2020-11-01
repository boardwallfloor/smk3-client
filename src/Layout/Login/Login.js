import * as React from 'react';
import { Notification } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';

import LoginForm from './LoginForm';
import Footer from './Footer';

var useStyles = makeStyles(function (theme) { return ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary[500],
    },
}); }, { name: 'RaLogin' });

const MyLoginPage = ({ theme }) => {
    
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.main}>
                <Card className={classes.card}>
                    <Paper>
                        <div className={classes.avatar}>
                            <Avatar className={classes.icon}>
                                <LockIcon />
                            </Avatar>
                        </div>
                        <LoginForm />
                        <Footer />
                    </Paper>
                </Card>
            <Notification />
            </div>
        </ThemeProvider>
    );
};

export default MyLoginPage;