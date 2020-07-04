import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import moment from 'moment';

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
		            <TableCell className={classes.bold}>Tanggal</TableCell>
		            <TableCell className={classes.bold}>Jenis Laporan</TableCell>
		            <TableCell className={classes.bold}>Status Laporan</TableCell>
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map(item => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{moment(item.remind_date).format("MMMM YYYY")}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.report_type === 'yearly' ? "Per Tahun" : "Per Semester"}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.complete_status ? "Selesai" : "Belum Selesai"}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

export const NotificationCard = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

    useEffect(() => {
        const resource = "notif"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`http://192.168.100.62:9000/${resource}/db`)
            const json = await result.json();
            setData(json.data);
            setCount(json.count)
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={NotificationsActiveIcon} link="#/notif" bgcolor="#f44336" name="Reminder" data={<InstitutionTable data={data}/>} length={count}/>
		)
}