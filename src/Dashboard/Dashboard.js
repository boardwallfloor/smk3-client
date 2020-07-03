import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import NoteIcon from '@material-ui/icons/Note';
import Button from '@material-ui/core/Button';

import Cards from './Cards/CardWithIcon'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Title title="SMK3" />
      <Grid container spacing={3}>
      	<Grid item xs={12}>
    		<Paper className={classes.paper}> Welcome Admin</Paper>

        </Grid>
        <Grid item xs={6}>
    		<Cards icon={NoteIcon} bgcolor="#f44336" resource="Report" data="user"/>
        </Grid>
        <Grid item xs={3}>
        	<Paper className={classes.paper}>Current Institute</Paper>
        </Grid>
        <Grid item xs={3}>
        	<Paper className={classes.paper}>Admin Only Last 10 Created User</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Currently Active CronJob</Paper>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={3} style={{marginTop: 0.1}}>
    	<Grid item xs={12}>
    		<Paper className={classes.paper}> Welcome User</Paper>

        </Grid>
        <Grid item xs={6}>
        	<Paper className={classes.paper}>User Report Notification State</Paper>
        </Grid>
        <Grid item xs={3}>
        	<Paper className={classes.paper}>Submitted Report Yearly</Paper>
        </Grid>
        <Grid item xs={3}>
        	<Paper className={classes.paper}>Submitted Report Semesterly</Paper>
        </Grid>
        </Grid>
    </div>
  );
}
