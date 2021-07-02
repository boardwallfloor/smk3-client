import React from 'react'
import Button from '@material-ui/core/Button';
import GridOnIcon from '@material-ui/icons/GridOn';
import { EditButton, TopToolbar} from 'react-admin';
import moment from 'moment';
import {CreateButton, sanitizeListRestProps} from 'react-admin';
import { usePermissions } from 'react-admin';

//Test
import {useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) =>({
  root: {
    marginLeft: theme.spacing(1),
  },
  input: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  input1: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '200px'
  },
  input2: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '200px'
  },
  popup:{
    display: "flex",
    flexWrap: "wrap",
    // width: "2000px"
  },
  margin: {
    margin: theme.spacing(1),
  },
}))


const FilterPrompt = (props) => {
    const [name, setName] = useState("")
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [validation, setValidation] = useState("")
    const [institutionOption, setInstitutionOption] = useState([])
    const [institution, setInstitution] = useState()
    const username = localStorage.getItem('username')
    const classes = useStyles()

    const validationOption = [
        {
            value:'',
            label:''
        },
        {
            value:true,
            label: 'Tervalidasi'
        },
        {
            value:false,
            label:' Belum tervalidasi'
        }
    ]

    const massExport = async () => {
        const query = await constructQuery(props.permissions)
        const file = await fetch(query)
        const fileInBlob = await file.blob()
        const fileUrl = window.URL.createObjectURL(fileInBlob);
        const currentDate = new Date()
        const fileName = `${props.resource} - ${currentDate.getFullYear()}.${currentDate.getMonth()}.${currentDate.getDate()}.xlsx`
        let a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(fileInBlob);
    }

    const constructQuery = (permissions) =>{
        let filter = {}
        if(name !== ''){
            filter.username = name
        }
        if(permissions === "Operator"){
            filter.username = username
        }
        if(dateStart !== ''){
            filter.date = [dateStart,dateEnd]
        }
        if(validation !== ''){
            filter.validated = validation
        }
        if(validation !== ''){
            filter.institution = institution
        }
        
        return (`${process.env.REACT_APP_API_LINK}/${props.resource}/exportall?filter=${JSON.stringify(filter)}`)
    }

    useEffect( () => {

        const fetchInstitution = async() => {
            const institutionData = await fetch(`${process.env.REACT_APP_API_LINK}/institution?select=_id+name`)
            const institutionDataJson = await institutionData.json()
            setInstitutionOption(institutionDataJson)


        }
        fetchInstitution()
    },[institution])

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDateStart = (event) => {
        setDateStart(event.target.value)
    }

    const handleChangeDateEnd = (event) => {
        setDateEnd(event.target.value)
    }

    const handleChangeValidation = (event) => {
        setValidation(event.target.value);
    }
    const handleChangeInstitution = (event) => {
        setInstitution(event.target.value);
    }
  
  return (
    <form  noValidate className={classes.root}  autoComplete="off">
        {props.permissions !== "Operator" ? 
        <TextField value={name} onChange={handleChangeName}  className={classes.input} size="small" label="Penulis" variant="outlined" />
         : null}
        {props.permissions === "Dinas Kesehatan" ?
            <TextField select value={institution} onChange={handleChangeInstitution} className={classes.input1} size="small" label="Institution" variant="outlined" >
                {institutionOption.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
            </TextField>
        : null}
        <TextField value={dateStart} onChange={handleChangeDateStart}  className={classes.input} size="small" type="date" label="Tanggal Awal" variant="outlined" InputLabelProps={{ shrink: true }}/>
        {dateStart !== "" ? <TextField value={dateEnd} onChange={handleChangeDateEnd}  className={classes.input} size="small" type="date" label="Tanggal Akhir" variant="outlined" InputLabelProps={{ shrink: true }}/>
        : null}
        {props.resource !== 'notif' ? <TextField value={validation} onChange={handleChangeValidation} InputLabelProps={{ shrink: true }} select className={classes.input2} size="small" label="Status Validasi" variant="outlined" >
            {validationOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </TextField>
        : null}
        <Button className={classes.margin} size="large" variant="contained" color="primary" onClick={massExport}>Download</Button>
    </form>
  );
}

const ExportButtonList = (props) =>{
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleClose = () => {
        setOpen(false);
    }

    const showNotification = () => {
      setOpen(true)
    }

    
    
    return(
    <div>
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={showNotification}>Export Spreadsheet</Button>
        <Popover className={classes.popup} open={open} onClose={handleClose}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
        }}
        >
            <FilterPrompt resource={props.resource} permissions={props.permissions}/>
        </Popover>
    </div>
    )
}
//Test

export const ExportButtonShow = ({ basePath, data, resource }) => {
    const [access, setAccess] = useState(true)
    const {permissions} = usePermissions();

    useEffect(() => {

        const getAccessLevel = handleAccess(permissions, resource)
        setAccess(getAccessLevel)
    },[permissions, resource])

    const getData = () => {
        const dateReformatted = moment(data.date).format("L")
        const fileName = [resource, dateReformatted]
        return fileName
    }

    const exportData = async () => {
        const file = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/export/${data.id}`)
        const fileInBlob = await file.blob()
        const fileUrl = window.URL.createObjectURL(fileInBlob);

        const [name, date] = getData()
        const fileName = `${name} - ${date}.xlsx`
        let a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(fileInBlob);
    } 

	return(
    <TopToolbar>
        {access === true ? <EditButton basePath={basePath} record={data} /> : null}
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={exportData}>Export Spreadsheet</Button>
        
    </TopToolbar>
    )

}

const handleAccess = (permissions, resource) => {
    if(permissions === 'Dinas Keseatan'){
        return false
    }
    if(permissions === 'Operator' && resource === 'notif'){
        return false
    }
    return true
    }

export const ListActions = ({currentSort, className, resource, filters, displayedFilters, filterValues, basePath, selectedIds, onUnselectItems, showFilter, data, ...rest}) => {
    
    const [access, setAccess] = useState(true)
    const {permissions} = usePermissions();

    useEffect(() => {

        const getAccessLevel = handleAccess(permissions, resource)
        setAccess(getAccessLevel)
    },[permissions,resource])

    return(
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            
            
            {/*<ExportButton />*/}
            {access === true ? <CreateButton basePath={basePath} /> : null}
            <ExportButtonList resource={resource} permissions={permissions}/>

        </TopToolbar>
    )
}

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};

