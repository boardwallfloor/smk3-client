import * as React from "react";
import { Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { usePermissions } from 'react-admin';

import {InstitutionCard} from './Cards/InstitutionCard/InstitutionCard';
import {NotificationCard} from './Cards/NotificationCard/NotificationCard';
import {ReportYearCard, ReportSemesterCard} from './Cards/ReportCard/ReportCard';
import {UserCard} from './Cards/UserCard/UserCard';
import {ReportStatusCard} from './Cards/ReportStatus/ReportStatus';
import {ReportSemesterCardUser, ReportYearCardUser} from './Cards/ReportCardUser/ReportCardUser'


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



export const Dashboard = () => {
  const classes = useStyles();
  const { permissions } = usePermissions();
  const username = localStorage.getItem('username')
  return (
    <div className={classes.root}>
    <Title title="SMK3" />
      {permissions === "Admin" ?
      <Grid container spacing={3}>
      	<Grid item xs={12}>
    		<Paper className={classes.paper}> Welcome {username}</Paper>
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
      : null}
      {permissions === 'User' && 
      <Grid container spacing={3} style={{marginTop: 0.1}}>
    	<Grid item xs={12}>
    		<Paper className={classes.paper}> Welcome {username}</Paper>
        </Grid>
        <Grid item xs={6}>
        	<ReportStatusCard />
        </Grid>
        <Grid item xs={3}>
          <ReportYearCardUser />
        </Grid>
        <Grid item xs={3}>
          <ReportSemesterCardUser />
        </Grid>
        </Grid>
      }
    </div>
  );
}
