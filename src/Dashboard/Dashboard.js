import * as React from "react";
import { Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import {InstitutionCard} from './Cards/InstitutionCard/InstitutionCard';
import {NotificationCard} from './Cards/NotificationCard/NotificationCard';
import {ReportYearCard, ReportSemesterCard} from './Cards/ReportCard/ReportCard';
import {UserCard} from './Cards/UserCard/UserCard';


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
      	<Grid item xs={6}>
    		<Paper className={classes.paper}> Welcome Admin, and status if this is user</Paper>
        </Grid>
        <Grid item xs={6}>
    		<p>Populate this and format later</p>
        <ReportYearCard />
        </Grid>
        <Grid item xs={3}>
          <p>Populate this later</p>
        	<InstitutionCard />
        </Grid>
        <Grid item xs={3}>
          <UserCard />
        </Grid>
        <Grid item xs={6}>
          <p>Populate this and format later</p>
          <NotificationCard />
        </Grid>
        <Grid item xs={6}>
          <p>Populate this and format later</p>
          <ReportSemesterCard />
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
