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
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}


export const ReportStatusCard = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

    useEffect(() => {
        const resource = "notif";
        const fetchData = async () => {
        	
    	const id = localStorage.getItem('userid')
		const query = `filter={"remindee":"${id}", "notification_status":"Belum Dikirim"}`
	 	const token = localStorage.getItem('jwt');
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`);
        const option = {
            method: 'GET',
            headers: myHeaders,
        }
		const result = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/db?${query}`,option)
		const json = await result.json();
		setData(json.data);
		setCount(json.count)
      }
    	fetchData();
  	}, []);
	return (
		<div>
			<CardWithIcon icon={NotificationsActiveIcon} link="#/notif" bgcolor="#f44336" name="Peringatan Laporan" data={<InstitutionTable data={data}/>} length={count}/>
			
		</div>
		)
}