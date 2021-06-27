import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import {ReportStatusCard} from '../../Cards/ReportStatus/ReportStatus';
import {ReportSemesterCardUser, ReportYearCardUser} from '../../Cards/ReportCardUser/ReportCardUser';

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

const OperatorDashboard = () => {
	const classes = useStyles();
  const userid = localStorage.getItem('userid');
	const username = localStorage.getItem('username')
  const query = `filter={"author":"${userid}"}`
  const remindee = `filter={"remindee":"${userid}"}`
	return (
		<Grid container spacing={3} style={{marginTop: 0.1}}>
      <Grid item xs={12}>
        <Paper className={classes.paper}> Welcome {username}</Paper>
        </Grid>
        <Grid item xs={4}>
          <ReportStatusCard query={remindee}/>
        </Grid>
        <Grid item xs={3}>
          <ReportYearCardUser query={query}/>
        </Grid>
        <Grid item xs={5}>
          <ReportSemesterCardUser query={query}/>
        </Grid>
    </Grid>
	)
}

export default OperatorDashboard