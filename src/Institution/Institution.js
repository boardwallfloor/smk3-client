import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, TextField, TextInput, EditButton, DeleteButton, ShowButton} from 'react-admin'

import PageTitle from '../Util/PageTitle';
import {ExportButtonShow, ListActions} from '../Util/ActionBar';

export const InstitutionList = ({permissions, ...props}) => (
    <List title="Fasyankes" {...props} actions={<ListActions />} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="name" label="Nama Fasyankes"/>
            <TextField source="address" label="Alamat"/>
            <TextField source="city" label="Kabupaten/Kota"/>
            <TextField source="province" label="Provinsi"/>
            { permissions === 'Operator' || permissions === 'Admin' ?
            <div>
                <EditButton />
                <DeleteButton />
            </div>
            :
            <ShowButton />
            }
        </Datagrid>
    </List>
);

export const InstitutionShow = props => (
    <Show actions={<ExportButtonShow />} title={<PageTitle action="Show"/>}  {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="province" />
        </SimpleShowLayout>
    </Show>
);

export const InstitutionEdit = props => (
    <Edit title={<PageTitle action="Edit"/>} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="province" />
        </SimpleForm>
    </Edit>
);
export const InstitutionCreate = props => (
    <Create title={<PageTitle action="Create"/>} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="province" />
        </SimpleForm>
    </Create>
);
