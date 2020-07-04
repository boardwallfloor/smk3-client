import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import CardWithIcon from '../CardWithIcon';

const useStyles = makeStyles({
    table: {
        width: '100%',
        padding: 0,
        // marginTop: 20,
  	},
  	bold: {
  		fontWeight: 'bold',
  	}
});

const InstitutionTable = (props) => {

    const classes = useStyles();
    
	return (
		<Table className={classes.table} size="small" aria-label="simple table">
	        <TableHead>
          		<TableRow>
		            <TableCell className={classes.bold}>Nama</TableCell>
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map(item => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.remind_date}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.remindee}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.status}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

export const NotificationCard = () => {
	const [data, setData] = useState([]);

    useEffect(() => {
        const resource = "notif"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`http://192.168.100.62:9000/${resource}`)
            const json = await result.json();
            setData(json);
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={NotificationsActiveIcon} bgcolor="#f44336" name="Reminder" data={<InstitutionTable data={data}/>} length={data.length}/>
		)
}