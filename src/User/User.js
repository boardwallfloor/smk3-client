import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, BooleanField, SelectInput, BooleanInput, DateInput, EmailField, DateField, ReferenceField, TextField, TextInput, NumberField, NumberInput, EditButton, DeleteButton} from 'react-admin'

import PageTitle from '../Util/PageTitle';

export const UserList = props => (
    <List title={<PageTitle action="Creating"/>} {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="username" label="Username"/>
            <TextField source="privilege" label="Jenis User"/>
            <EmailField source="email" label="Email"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="privilege" />
            <TextInput source="nip" />
            <TextInput source="email" />
            <TextInput source="phonenumber" />
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <SelectInput source="privilege" choices={[
                { id: 'User', name: 'User' },
                { id: 'Admin', name: 'Admin' }
            ]} />
            <TextInput source="nip" />
            <TextInput source="email" />
            <TextInput source="phonenumber" />
            <TextInput source="password" />
            <TextInput source="jobtitle" />
        </SimpleForm>
    </Create>
);

export const UserShow = props => (
    <Show title={<PageTitle action="Show"/>} {...props}>
        <SimpleShowLayout>
            <TextField source="privilege" />
            <TextField source="nip" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phonenumber" />
            <TextField source="password" />
            <NumberField source="__v" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);