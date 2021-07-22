import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import K3_2 from '../../asset/K3/k3_sm.png'
import UGM2 from '../../asset/UGM/(PNG Image, 310 × 163 pixels).png'

const useStyles = makeStyles((theme) =>({
  root: {
    '& img': {
    	margin : theme.spacing(0)
    },
  },
  alignContent : {
  	display: 'flex',
  	justifyContent : 'center'
  }
}))

const Footer = () => {
	const classes = useStyles()
	return (
		
			<Grid className={classes.root} container>
				<Grid className={classes.alignContent} item xs={6}  >
					<img  src={K3_2} width='200px' alt='K3'/>
				</Grid>
				<Grid item xs={6}>
					<img src={UGM2} alt='UGM' width='200px'/>
				</Grid>
				
			</Grid>
		
	)
}

export default Footer;