import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {InstitutionCard} from '../../Cards/InstitutionCard/InstitutionCard';
import {ReportSemesterCardUser, ReportYearCardUser} from '../../Cards/ReportCardUser/ReportCardUser';
import {ReportChart} from '../../Chart/ReportChart';

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

const DinasDashboard = () => {
	const classes = useStyles();
  	const username = localStorage.getItem('username')
	return (
		<Grid container spacing={3} style={{marginTop: 0.1}}>
      <Grid item xs={12}>
        <Paper className={classes.paper}> Welcome {username}</Paper>
      </Grid>
      <Grid item xs={12}>
        <ReportChart />
      </Grid>
      <Grid item xs={6}>
        <ReportYearCardUser query='{}'/>
      </Grid>
      <Grid item xs={6}>
        <ReportSemesterCardUser query='{}'/>
      </Grid>
      <Grid item xs={3}>
          <InstitutionCard />
        </Grid>
    </Grid>
	)
}

export default DinasDashboard