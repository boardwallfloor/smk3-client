import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const AlertDialog = (props) => {
	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
	setOpen(true);
	};

	const handleClose = () => {
	setOpen(false);
	};
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Peringatan Laporan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda belum mengirim laporan anda. Mohon cek email anda. Laporan yang belum anda kirim adalah :
          </DialogContentText>
          	{props.data.map(item => (
          <DialogContentText>
	                	{item.report_type === 'yearly' ? "Laporan Per Tahun"  : "Laporan Per Semester"}
	                	{" untuk tanggal "+moment(item.remind_date).format("MMMM YYYY")}
          </DialogContentText>
	          	))}
        </DialogContent>
        <DialogActions>
	    	<Button href='#/reportsemester' color="primary">
	            Buat Laporan Semester
	      	</Button>
	      	<Button href='#/reportyear' color="primary">
	            Buat Laporan Tahunan
	      	</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
            const query = `filter={"remindee":"${id}", "complete_status":"false"}`
            const result = await fetch(`http://192.168.100.62:9000/${resource}/db?${query}`)
            const json = await result.json();
            setData(json.data);
            setCount(json.count)
            console.log(json)
      }
    fetchData();
  	}, []);
	return (
		<div>
			<CardWithIcon icon={NotificationsActiveIcon} link="#/notif" bgcolor="#f44336" name="Peringatan Laporan" data={<InstitutionTable data={data}/>} length={count}/>
			{count>0 ? <AlertDialog data={data}/>: null}
		</div>
		)
}