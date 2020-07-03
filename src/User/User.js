import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, SelectInput, EmailField, TextField, TextInput, NumberField, EditButton, DeleteButton} from 'react-admin'
import {
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
    email,
    choices
} from 'react-admin';

import PageTitle from '../Util/PageTitle';

export const UserList = props => (
    <List title="User" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="full_name" label="Nama"/>
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
            <TextInput source="first_name" />
            <TextInput source="full_name" />
            <TextInput source="privilege" />
            <TextInput source="nip" />
            <TextInput source="email" />
            <TextInput source="phonenumber" />
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);

const validateUserName = required();
const validateFirstName = required();
const validateFullName = required();
const validatePrivilege = [choices(['Admin', 'User'], 'Must be User or Admin'), required()];
const validateEmail = [email(), required()];
const validatePhoneNumber = required();
const validatePassword = [required(), minValue(8)];
const validateJobTitle = required();

export const UserCreate = props => (
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <SimpleForm>
            <TextInput source="username" validate={validateUserName} />
            <TextInput source="first_name" validate={validateFirstName} />
            <TextInput source="full_name" validate={validateFullName} />
            <SelectInput source="privilege" validate={validatePrivilege} choices={[
                { id: 'User', name: 'User' },
                { id: 'Admin', name: 'Admin' }
            ]} />
            <TextInput source="nip"/>
            <TextInput source="email" validate={validateEmail}/>
            <TextInput source="phonenumber" validate={validatePhoneNumber}/>
            <TextInput source="password" validate={validatePassword}/>
            <TextInput source="jobtitle" validate={validateJobTitle}/>
        </SimpleForm>
    </Create>
);

export const UserShow = props => {
    console.log(props.record)
    return (
    <Show title={<PageTitle action="Show"/>} {...props}>
        <SimpleShowLayout>
            <TextField source="privilege" />
            <TextField source="nip" />
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="full_name" />
            <EmailField source="email" />
            <TextField source="phonenumber" />
        </SimpleShowLayout>
    </Show>
);
}