import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import {InstitutionCard} from '../../Cards/InstitutionCard/InstitutionCard';
import {NotificationCard} from '../../Cards/NotificationCard/NotificationCard';
import {ReportYearCard, ReportSemesterCard} from '../../Cards/ReportCard/ReportCard';
import {ReportChart} from '../../Chart/ReportChart';
import {UserCard} from '../../Cards/UserCard/UserCard';

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

const AdminDashboard = () => {
	const classes = useStyles();
  const username = localStorage.getItem('username')
  
	return (
		<Grid container spacing={3}>
      	<Grid item xs={12}>
    		<Paper className={classes.paper}> Welcome {username}</Paper>
        </Grid>
        <Grid item xs={12}>
          <ReportChart />
        </Grid>
        <Grid item xs={6}>
        <ReportYearCard />
        </Grid>
        <Grid item xs={6}>
          <ReportSemesterCard />
        </Grid>
        <Grid item xs={6}>
          <NotificationCard />
        </Grid>
        <Grid item xs={3}>
        	<InstitutionCard />
        </Grid>
        <Grid item xs={3}>
          <UserCard />
        </Grid>
      </Grid>	
	)
}

export default AdminDashboard