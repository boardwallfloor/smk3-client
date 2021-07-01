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
    width: "2000px"
  },
  margin: {
    margin: theme.spacing(1),
  },
}))


const FilterPrompt = (props) => {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [validation, setValidation] = useState(true)
    const [institutionOption, setInstitutionOption] = useState([])
    const [institution, setInstitution] = useState({})
    const classes = useStyles()

    const validationOption = [
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
        const query = await constructQuery()
        const file = await fetch(query)
        const fileInBlob = await file.blob()
        const fileUrl = window.URL.createObjectURL(fileInBlob);

        const fileName = `${props.resource}.xlsx`
        let a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(fileInBlob);
    }

    const constructQuery = () =>{
        let filter = {}
        if(name !== ''){
            filter.username = name
        }
        if(date !== ''){
            filter.date = date
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

    const handleChangeDate = (event) => {
        setDate(event.target.value)
    }

    const handleChangeValidation = (event) => {
        setValidation(event.target.value);
    }
    const handleChangeInstitution = (event) => {
        setInstitution(event.target.value);
    }
  
  return (
    <form  noValidate className={classes.root}  autoComplete="off">
        <TextField value={name} onChange={handleChangeName}  className={classes.input} size="small" label="Penulis" variant="outlined" />
        {props.permissions === "Dinas Kesehatan" ?
            <TextField select value={institution} onChange={handleChangeInstitution} className={classes.input1} size="small" label="Institution" variant="outlined" >
                {institutionOption.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
            </TextField>
        : null}
        <TextField value={date} onChange={handleChangeDate}  className={classes.input} size="small" type="date" label="Tanggal" variant="outlined" InputLabelProps={{ shrink: true }}/>
        <TextField value={validation} onChange={handleChangeValidation} InputLabelProps={{ shrink: true }} select className={classes.input2} size="small" label="Status Validasi" variant="outlined" >
            {validationOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </TextField>
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
        <EditButton basePath={basePath} record={data} />
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={exportData}>Export Spreadsheet</Button>
        
    </TopToolbar>
    )

}


export const ListActions = ({currentSort, className, resource, filters, displayedFilters, filterValues, basePath, selectedIds, onUnselectItems, showFilter, data, ...rest}) => {
    

    const {permissions} = usePermissions();
    return(
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            
            {permissions === "Dinas Kesehatan"  ? null : <CreateButton basePath={basePath} />}
            {/*<ExportButton />*/}
            <ExportButtonList resource={resource} permissions={permissions}/>

        </TopToolbar>
    )
}

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};
