import React from 'react'
import cloneElement from 'react'
import Button from '@material-ui/core/Button';
import GridOnIcon from '@material-ui/icons/GridOn';
import { EditButton, TopToolbar} from 'react-admin';
import moment from 'moment';
import {CreateButton, sanitizeListRestProps} from 'react-admin';
import { usePermissions } from 'react-admin';

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
        </TopToolbar>
    )
}

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};