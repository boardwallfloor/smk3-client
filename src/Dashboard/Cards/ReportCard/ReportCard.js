import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DateRangeIcon from '@material-ui/icons/DateRange';

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

const ReportYearTable = (props) => {

    const classes = useStyles();
    
	return (
		<Table className={classes.table} size="small" aria-label="simple table">
	        <TableHead>
          		<TableRow>
		            <TableCell className={classes.bold}>Nama</TableCell>
		            <TableCell className={classes.bold}>Tahun</TableCell>
		            <TableCell className={classes.bold}>Fasyankes</TableCell>
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map(item => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.author}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.year}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.institution}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

const ReportSemesterTable = (props) => {

    const classes = useStyles();
    
	return (
		<Table className={classes.table} size="small" aria-label="simple table">
	        <TableHead>
          		<TableRow>
		            <TableCell className={classes.bold}>Nama</TableCell>
		            <TableCell className={classes.bold}>Bulan</TableCell>
		            <TableCell className={classes.bold}>Tahun</TableCell>
		            <TableCell className={classes.bold}>Fasyankes</TableCell>
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map(item => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.author}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.month}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.year}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.institution}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

export const ReportYearCard = () => {
	const [data, setData] = useState([]);

    useEffect(() => {
        const resource = "reportyear"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`http://192.168.100.62:9000/${resource}`)
            const json = await result.json();
            setData(json);
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={EventNoteIcon} bgcolor="#f44336" name="Laporan Per Tahun" data={<ReportYearTable data={data}/>} length={data.length}/>
		)
}

export const ReportSemesterCard = () => {
	const [data, setData] = useState([]);

    useEffect(() => {
        const resource = "reportsemester"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`http://192.168.100.62:9000/${resource}`)
            const json = await result.json();
            setData(json);
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={DateRangeIcon} bgcolor="#f44336" name="Laporan Per Semester" data={<ReportSemesterTable data={data}/>} length={data.length}/>
		)
}