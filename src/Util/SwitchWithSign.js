import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {  BooleanInput} from "react-admin";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '20px',
  },
centering: {
    marginBottom: '-20px',
  },
  leftIndent: {
        
    marginLeft: '20px',
  },
}));

const SwitchWithSign = (props) => {
	const classes = useStyles();
	return (
    <div>
      <p className={classes.leftIndent} fullWidth>{props.label}</p>
      <div className={classes.root} fullWidth>
        <Grid container alignItems="center" zeroMinWidth={true}>
            <Grid  item xs={1} >
              <p >Tidak Ada</p>
        
            </Grid>
            <Grid  item xs={1} >
            <BooleanInput className={classes.centering}
                    fullWidth
                    source={props.source}
                    label = ""
                    /> 
                    {/* <p>Switch</p> */}
            </Grid>
            <Grid  item xs={1} >
                <p >Ada</p>
            </Grid>
        </Grid>
    </div>
  </div>
	)
}

export default SwitchWithSign