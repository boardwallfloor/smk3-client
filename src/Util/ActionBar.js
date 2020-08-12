import React from 'react'
import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import GridOnIcon from '@material-ui/icons/GridOn';


const ActionBar = ({ basePath, data, resource }) => {
	const getFile = () => {
		//TODO : Get current data files
		alert('Uh oh')
	}	
	return (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button size='small' startIcon={<GetAppIcon />} color="primary" onClick={getFile}>Download Embedded File</Button>
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={getFile}>Export Data to Spreadsheet</Button>
    </TopToolbar>
)};

export default ActionBar;