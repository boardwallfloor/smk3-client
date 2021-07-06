import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, SelectInput, EmailField, TextField, TextInput, PasswordInput, EditButton, DeleteButton, ReferenceField, ReferenceInput} from 'react-admin'
import {
    required,
    minValue,
    email,
    } from 'react-admin';

import PageTitle from '../Util/PageTitle';

export const UserList = props => (
    <List title="User" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="full_name" label="Nama"/>
            <TextField source="privilege" label="Jenis User"/>
            <TextField source="email" label="Email"/>
            <ReferenceField link={false} label="Fasyankes" source="user_institution" reference="institution">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <SimpleForm>
            <TextInput source="username" label="Usernameama"/>
            <TextInput source="first_name" label="Nama Depan"/>
            <TextInput source="full_name" label="Nama Penuh"/>
            <TextInput source="privilege" label="Jenis User"/>
            <TextInput source="nip" label="NIP"/>
            <TextInput source="email" label="Email"/>
            <TextInput source="phonenumber" label="Nomor HP"/>
            <PasswordInput source="password" label="Password" />
            <TextInput source="job_title" label="Jenis Pegawai"/>
            <ReferenceInput label="Fasyankes" source="user_institution" reference="institution">
                    <SelectInput source="name"/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

const validateUserName = required();
const validateFirstName = required();
const validateFullName = required();
// const validatePrivilege = [choices(['Admin', 'User'], 'Must be User or Admin'), required()];
const validateEmail = [email(), required()];
const validatePhoneNumber = required();
const validatePassword = [required(), minValue(8)];
const validateJobTitle = required();

export const UserCreate = props => (
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <SimpleForm redirect='show'>
            <TextInput source="username" validate={validateUserName} />
            <TextInput source="first_name" validate={validateFirstName} />
            <TextInput source="full_name" validate={validateFullName} />
            <SelectInput source="privilege" label='Peran Akun' choices={[
                { id: 'Operator', name: 'Operator' },
                { id: 'Admin', name: 'Admin' },
                { id: 'Kepala Fasyankes', name: 'Kepala Fasyankes' },
                { id: 'Dinas Kesehatan', name: 'Dinas Kesehatan' }
            ]} />
            <TextInput source="nip"/>
            <TextInput source="email" validate={validateEmail}/>
            <TextInput source="phonenumber" validate={validatePhoneNumber}/>
            <PasswordInput source="password" validate={validatePassword}/>
            <TextInput source="job_title" validate={validateJobTitle}/>
            <ReferenceInput label="Fasyankes" source="user_institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const UserShow = props => {
    // console.log(props.record)
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
            <ReferenceField link={false} label="Fasyankes" source="user_institution" reference="institution">
                    <TextField source="name"/>
            </ReferenceField>
            <TextField source="job_title" />
        </SimpleShowLayout>
    </Show>
);
}