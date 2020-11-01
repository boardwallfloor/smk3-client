import React from 'react';
import {Create, Edit, List, Show, BooleanField, DateField, ReferenceField, Datagrid, SimpleShowLayout, SimpleForm, TextField, EditButton, DeleteButton, BooleanInput, ReferenceInput, SelectInput, DateInput, SelectField, useNotify} from 'react-admin'
import PageTitle from '../Util/PageTitle';

export const NotifList = props => (
    <List title="Reminder" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <ReferenceField label="Reminder maker" source="remindee" reference="user">
                <TextField source="first_name" />
            </ReferenceField>
            <BooleanField source="complete_status" label='Status' />
            <DateField source="remind_date" />
            <SelectField source="report_type" choices={[
               { id: 'yearly', name: 'Laporan Per Tahun' },
               { id: 'semesterly', name: 'Laporan Per Semester' },
            ]} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const NotifEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <SimpleForm>
            <BooleanInput source="complete_status" label='Status' />
            <ReferenceInput label="Author" source="remindee" reference="user">
                <SelectInput optionText="username"/>
            </ReferenceInput>
            <DateInput source="remind_date" />
            <SelectInput source="report_type" label="Jenis Laporan" choices={[
                { id: 'yearly', name: 'Laporan Per Tahun' },
                { id: 'semesterly', name: 'Laporan Per Semester' }
            ]} />
        </SimpleForm>
    </Edit>
);

export const NotifCreate = props => {
    const notify = useNotify();
    const onFailure = (error) => {
        console.log(error)
        // if (error.code === '123') {
            notify(`${error.message}`, 'warning');
        // }
    }
    return (
    <Create title={<PageTitle action="Creating"/>} {...props} onFailure={onFailure}>
        <SimpleForm>
            <ReferenceInput label="Author" source="remindee" reference="user">
                <SelectInput optionText="username"/>
            </ReferenceInput>
            <DateInput source="remind_date" fullWidth/>
            <SelectInput source="report_type" label="Jenis Laporan" choices={[
                { id: 'yearly', name: 'Laporan Per Tahun' },
                { id: 'semesterly', name: 'Laporan Per Semester' }
            ]} />
        </SimpleForm>
    </Create>
    )
}

export const NotifShow = props => (
    <Show title={<PageTitle action="Show"/>} {...props}>
        <SimpleShowLayout>
            <ReferenceField label="Reminder maker" source="remindee" reference="user">
                <TextField source="first_name" />
            </ReferenceField>
            <ReferenceField label="Reminder maker" source="remindee" reference="user">
                <TextField source="username" />
            </ReferenceField>
            <BooleanField source="complete_status" label='Status' />
            <DateField source="remind_date" />
            <SelectField source="report_type" choices={[
               { id: 'yearly', name: 'Laporan Per Tahun' },
               { id: 'semesterly', name: 'Laporan Per Semester' },
            ]} />

        </SimpleShowLayout>
    </Show>
);