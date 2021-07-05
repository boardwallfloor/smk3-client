import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import K3_2 from '../../asset/K3/k3_sm.png'
import UGM2 from '../../asset/UGM/(PNG Image, 310 × 163 pixels).png'

const useStyles = makeStyles((theme) =>({
  root: {
    '& img': {
    	margin : theme.spacing(1)
    },
  }
}))

const Footer = () => {
	const classes = useStyles()
	return (
		<div >
			<Grid className={classes.root} container spacing={0}>
				<Grid item xs>
					<img  src={K3_2} alt='K3'/>
				</Grid>
				<Grid item xs>
					<img src={UGM2} alt='UGM' />
				</Grid>
				
			</Grid>
		</div>
	)
}

export default Footer;