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
import { usePermissions } from 'react-admin';

const AlertDialog = (props) => {
  const [reportSemester, setReportSemester] = useState({laporan:'Semester'})
  const [reportYear, setReportYear] = useState({laporan:'Tahun'})

  // console.log(props.data)
  // console.log(reportYear)
  const handleClose = () => {
    props.onClose(false);
  }

  useEffect(() => {

    if(props.data.year !== undefined){
      setReportYear(props.data.year)
    }
    if(props.data.semester !== undefined){
      setReportSemester(props.data.semester)
    }
  },[props.data.year,props.data.semester])

  return (
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Peringatan Laporan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        	{Object.values(reportSemester).map(item => (
            <DialogContentText>
            	{"Laporan Per Semester untuk "+moment(item.date).format("MMMM YYYY")}
            </DialogContentText>
        	))}
          
          {Object.values(reportYear).map(item => (
            <DialogContentText>
              {"Laporan Per Tahun untuk "+moment(item.year).format("MMMM YYYY")}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
	    	<Button href='#/reportsemester' color="primary" onClick={handleClose}>
	            Laporan Semester
	      	</Button>
	      	<Button href='#/reportyear' color="primary" onClick={handleClose}>
	            Laporan Tahunan
	      	</Button>
        </DialogActions>
      </Dialog>
  );
}

export const NotificationBadge = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState(0)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()
    const {permissions} = usePermissions();
    const institution = localStorage.getItem('institution')
    const showNotification = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false);
    }

    
    useEffect(() => {
    const id = localStorage.getItem('userid')
    // console.log(id +" "+ institution)
    const fetchData = async () => {
 
      if(permissions === 'Kepala Fasyankes'){
        const uri = `filter={"institution":"${institution}","validated":"false"}&select=validated`
        const reportYear = await fetch(`${process.env.REACT_APP_API_LINK}/reportyear?${uri}+year&sort=["year","ASC"]`)
        const reportSemester = await fetch(`${process.env.REACT_APP_API_LINK}/reportsemester?${uri}+date&sort=["date","ASC"]`)
        // console.log(`${process.env.REACT_APP_API_LINK}/reportsemester?${uri}`)
        
        const reportYearJson = await reportYear.json()
        const reportSemesterJson = await reportSemester.json()
        const combinedCount = await reportSemesterJson.length + reportYearJson.length
        const combinedReports = {
          year : Object.values(reportYearJson),
          semester : Object.values(reportSemesterJson)
        }

        setMessage("Terdapat laporan yang belum tervalidasi. Laporan yang belum tersebut adalah :")
        setData(combinedReports)
        setCount(combinedCount)
      
      }
      if(permissions === 'Operator'){
        const uri =  `filter={"remindee":"${id}", "notification_status":"Belum Dikirim"}`
        const notif = await fetch(`${process.env.REACT_APP_API_LINK}/notif?${uri}`)
        const notifJson = await notif.json()
        const notifCount = notifJson.length
        setMessage( "Anda belum mengirim laporan anda. Mohon cek email anda. Laporan yang belum anda kirim adalah :")
        setData(notifJson)
        setCount(notifCount)
        
      }
      if(permissions === 'Kepala Dinas'){

      }
      if(permissions === 'Admin'){
        
      }

      
      
    }
    fetchData()
    }, [permissions,institution]);

    return (
      <div>
        <IconButton onClick={showNotification}>
          <Badge badgeContent={count} color="error">
            <NotificationsNoneOutlinedIcon style={{ color: 'white' }}/>
          </Badge>
        </IconButton>
        <AlertDialog message={message} open={open} data={data} onClose={handleClose}/>
                
      </div>
    )
}

