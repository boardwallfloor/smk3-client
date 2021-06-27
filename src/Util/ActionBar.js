import React from 'react'
import cloneElement from 'react'
import Button from '@material-ui/core/Button';
import GridOnIcon from '@material-ui/icons/GridOn';
import { EditButton, TopToolbar} from 'react-admin';
import moment from 'moment';
import {CreateButton, sanitizeListRestProps} from 'react-admin';
import { usePermissions } from 'react-admin';

//Test
import {useState} from 'react'
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
  popup:{
    display: "flex",
    flexWrap: "wrap",
    width: "1250px"
  },
  margin: {
    margin: theme.spacing(1),
  },
}))


export function CustomizedSelects() {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [validation, setValidation] = useState(true)
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

    const downloadFile = () =>{
        alert(name + " " + date + " " + validation)
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value)
    }

    const handleChangeValidation = (event) => {
        setValidation(event.target.value);
    }
  
  return (
    <form  noValidate className={classes.root}  autoComplete="off">
        <TextField value={name} onChange={handleChangeName}  className={classes.input} size="small" label="Penulis" variant="outlined" />
        <TextField value={date} onChange={handleChangeDate}  className={classes.input} size="small" type="date" label="Tanggal" variant="outlined" InputLabelProps={{ shrink: true }}/>
        <TextField value={validation} onChange={handleChangeValidation} InputLabelProps={{ shrink: true }} select className={classes.input} size="small" label="Status Validasi" variant="outlined" >
            {validationOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </TextField>
        <Button className={classes.margin} size="large" variant="contained" color="primary" onClick={downloadFile}>Download</Button>
    </form>
  );
}

const SearchPopUp = () =>{
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
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={showNotification}>Test Export Spreadsheet</Button>
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
            <CustomizedSelects />
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
        const file = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/send/${data.id}`)
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
    
    const massExport = async () => {
        const file = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/exportall`)
        const fileInBlob = await file.blob()
        const fileUrl = window.URL.createObjectURL(fileInBlob);

        const fileName = `${resource}.xlsx`
        let a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(fileInBlob);
    }
    const ExportButton = () => {
        return(
            <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={massExport}>Export Spreadsheet</Button>
        )
    }
    const {permissions} = usePermissions();
    return(
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            {permissions === "Dinas Kesehatan"  ? null : <CreateButton basePath={basePath} />}
            <ExportButton />
            <SearchPopUp />

        </TopToolbar>
    )
}

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};
