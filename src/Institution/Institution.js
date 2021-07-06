import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, TextField, TextInput, EditButton, DeleteButton, ShowButton} from 'react-admin'
import { makeStyles } from '@material-ui/core';

import PageTitle from '../Util/PageTitle';
import {ExportButtonShow, ListActions} from '../Util/ActionBar';

const useStyles = makeStyles({
    headerCell: {
        fontWeight: 'bold',
        borderBottom: 'solid black'
    },
});


export const InstitutionList = ({permissions, ...props}) => {
    console.log(permissions)
    const classes = useStyles();
    return(
        <List title="Fasyankes" {...props} actions={<ListActions />} bulkActionButtons={false}>
            <Datagrid classes={{ headerCell: classes.headerCell }} rowClick="show">
                <TextField source="name" label="Nama Fasyankes"/>
                <TextField source="address" label="Alamat"/>
                <TextField source="city" label="Kabupaten/Kota"/>
                <TextField source="province" label="Provinsi"/>
                { permissions === 'Admin' ?
                <EditButton />                   
                :
                <ShowButton />
                }
                { permissions === 'Admin' ?
                <DeleteButton />                 
                :null
                }
                
            </Datagrid>
        </List>
    );
}

export const InstitutionShow = props => (
    <Show actions={<ExportButtonShow />} title={<PageTitle action="Show"/>}  {...props}>
        <SimpleShowLayout>
            <TextField source="name" label="Nama Fasyankes"/>
            <TextField source="address" label="Alamat"/>
            <TextField source="city" label="Kabupaten/Kota" />
            <TextField source="province" label="Provinsi"/>
        </SimpleShowLayout>
    </Show>
);

export const InstitutionEdit = props => (
    <Edit title={<PageTitle action="Edit"/>} {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nama Fasyankes" />
            <TextInput source="address" label="Alamat"/>
            <TextInput source="city" label="Kabupaten/Kota" />
            <TextInput source="province" label="Provinsi" />
        </SimpleForm>
    </Edit>
);
export const InstitutionCreate = props => (
    <Create title={<PageTitle action="Create"/>} {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nama Fasyankes" />
            <TextInput source="address" label="Alamat"/>
            <TextInput source="city" label="Kabupaten/Kota" />
            <TextInput source="province" label="Provinsi" />
        </SimpleForm>
    </Create>
);
