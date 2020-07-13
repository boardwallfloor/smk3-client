import React from "react";
import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useSidebarStyles = makeStyles({
    drawerPaper: {
        backgroundColor: 'white',
    },
});

export const CustomSidebar = props => {
	console.log('msg')
    const classes = useSidebarStyles();
    return (
        <Paper>
        <Sidebar classes={classes} {...props} />
        </Paper>
    );
};