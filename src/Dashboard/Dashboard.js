import * as React from "react";
import { Title } from 'react-admin';
import { usePermissions } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import AdminDashboard from './RoleDashboard/AdminDashboard/AdminDashboard'
import KepalaDashboard from './RoleDashboard/KepalaDashboard/KepalaDashboard'
import OperatorDashboard from './RoleDashboard/OperatorDashboard/OperatorDashboard'
import DinasDashboard from './RoleDashboard/DinasDashboard/DinasDashboard.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));



export const Dashboard = () => {
  const classes = useStyles();
  const { permissions } = usePermissions();
  return (
    <div className={classes.root}>
    <Title title="SMK3" />
      {permissions === "Admin" ?
      <AdminDashboard />
      : null}
      {permissions === 'Operator' && 
      <OperatorDashboard />
      }
      {permissions === 'Kepala Fasyankes' && 
      <KepalaDashboard />
      }
      {permissions === 'Dinas Kesehatan' && 
      <DinasDashboard />
      }
    </div>
  );
}
