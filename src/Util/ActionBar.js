import React from 'react'
import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar, downloadCSV } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import GridOnIcon from '@material-ui/icons/GridOn';
import jsonExport from 'jsonexport/dist';


const ActionBar = ({ basePath, data, resource }) => {
    const getData = async () => {
        //TODO : Get current data files
        console.log(data._id)
        const result = await fetch(`http://192.168.100.62:9000/${resource}/send/${data.id}`)
        const json = await result.json()
        const {author:{full_name}, institution:{name}, _id, __v, ...exportData} = json
        exportData.author = full_name
        exportData.institution = name
        console.log(exportData)
        jsonExport(exportData, {
            // headers: ['author', 'date', 'institution','validated','report'],
            // rename:['Username Operator', 'Tanggal Pembuatan','Fasyankes','Status Laporan','Jumlah SDM Fasyankes','Keterangan'],
            verticalOutput: false,
        }, (err, csv) => {
            downloadCSV(csv, resource); // download as 'posts.csv` file
        });
        alert(exportData)
    }   
	return (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button size='small' startIcon={<GridOnIcon />} color="primary" onClick={getData}>Export Data to Spreadsheet</Button>
    </TopToolbar>
)};

export default ActionBar;