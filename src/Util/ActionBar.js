import React from 'react'
import Button from '@material-ui/core/Button';
import GridOnIcon from '@material-ui/icons/GridOn';
import { EditButton, TopToolbar} from 'react-admin';
import moment from 'moment';


const ActionBar = ({ basePath, data, resource }) => {

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

	return (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={exportData}>Export Data to Spreadsheet</Button>
    </TopToolbar>
)};

export default ActionBar;