import React from 'react'
import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';


const ActionBar = ({ basePath, data, resource }) => {
	const getFile = () => {
		//TODO : Get current data files
		alert('Uh oh')
	}	
	const getData = () => {
		//TODO : Get current data data
		alert('Uh oh')
	}
	return (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button size='small' startIcon={<GetAppIcon />} color="primary" onClick={getFile}>Download Embedded File</Button>
        <Button size='small' startIcon={<GetAppIcon />}  color="primary" onClick={getData}>Download Data</Button>
    </TopToolbar>
)};

export default ActionBar