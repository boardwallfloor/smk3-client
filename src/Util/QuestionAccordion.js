import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: '13px',
  },
}));

const QuestionAccordion = (props) => {
	const classes = useStyles();
	return (
		<Grid  container spacing={1}>
			<Grid item>
				<p>{props.question}</p>
			</Grid>
			<Grid item xs={1}>
				<Tooltip title={props.text}>
			        <IconButton className={classes.margin} size="small" aria-label="question?">
			          <HelpIcon fontSize="small"/>
			        </IconButton>
     			</Tooltip>
			</Grid>
		</Grid>
	)
}

export default QuestionAccordion