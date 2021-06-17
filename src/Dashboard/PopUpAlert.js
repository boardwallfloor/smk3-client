import React,{useState, useEffect} from "react";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

const AlertDialog = (props) => {
  const handleClose = () => {
    props.onClose(false);
  }

  return (
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Peringatan Laporan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda belum mengirim laporan anda. Mohon cek email anda. Laporan yang belum anda kirim adalah :
          </DialogContentText>
        	{Object.values(props.data).map(item => (
            <DialogContentText>
            	{item.report_type === 'yearly' ? "Laporan Per Tahun"  : "Laporan Per Semester"}
            	{" untuk "+moment(item.remind_date).format("MMMM YYYY")}
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
  );
}

export const NotificationBadge = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState(0)
    const [open, setOpen] = useState(false)

    const showNotification = () => {
      // alert(`Todo : Notification ${count}`)
      // setCount(count+1)
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false);
    }
    useEffect(() => {
      const resource = "notif";
      const fetchData = async () => {
          const id = localStorage.getItem('userid')
          const query = `filter={"remindee":"${id}", "notification_status":"Belum Dikirim"}`
          const result = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/count?${query}`)
          const json = await result.json();
          setCount(json.count)
          setData(json.data)
      }
      fetchData()
    }, []);

    return (
      <div>
        <IconButton onClick={showNotification}>
          <Badge badgeContent={count} color="error">
            <NotificationsNoneOutlinedIcon style={{ color: 'white' }}/>
          </Badge>
        </IconButton>
        <AlertDialog open={open} data={data} onClose={handleClose}/>
                
      </div>
    )
}

