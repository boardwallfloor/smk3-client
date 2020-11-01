import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DateRangeIcon from '@material-ui/icons/DateRange';
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
	          	{props.data.map((item, index) => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.author.username}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{moment(item.year).format("YYYY")}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.institution.name}
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
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map((item, index) => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.author.username}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.month}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{moment(item.year).format("YYYY")}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

export const ReportYearCard = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

    useEffect(() => {
        const resource = "reportyear"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/db`)
            const json = await result.json();
            // console.log(json.data[0].author)
            setData(json.data);
            setCount(json.count)
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={EventNoteIcon} link="#/reportyear" bgcolor="#f44336" name="Laporan Per Tahun" data={<ReportYearTable data={data}/>} length={count}/>
		)
}

export const ReportSemesterCard = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

    useEffect(() => {
        const resource = "reportsemester"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/db`)
            const json = await result.json();
            setData(json.data);
            // console.log(json)
            setCount(json.count)
      }
    fetchData();
  	}, []);

  	
	return (
		<CardWithIcon icon={DateRangeIcon} link="#/reportsemester" bgcolor="#f44336" name="Laporan Per Semester" data={<ReportSemesterTable data={data}/>} length={count}/>
		)
}