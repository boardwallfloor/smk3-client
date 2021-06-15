import React from "react";
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {MyUserMenu} from './UserMenu'
import {Logo} from './Logo';
import {NotificationBadge} from '../../Dashboard/PopUpAlert'

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    greenBackground: {
        backgroundColor: '#a2de96',
    }
});



export const CustomAppBar = props => {
    const classes = useStyles();
    
    return (
        <AppBar  {...props} userMenu={<MyUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Logo />
            <span className={classes.spacer} />
            <NotificationBadge />
        </AppBar>
    );
};