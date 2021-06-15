import React from 'react';
import {Create, Edit, List, Show, DateField, ReferenceField, Datagrid, SimpleShowLayout, SimpleForm, TextField, EditButton, DeleteButton, ReferenceInput, SelectInput, DateInput, SelectField, useNotify} from 'react-admin'
import { usePermissions } from 'react-admin';

import PageTitle from '../Util/PageTitle';
import {NoDeleteToolbar} from '../Util/CustomToolbar'

export const NotifList = props => {
    const {permissions} = usePermissions();
    return(
        <List title="Reminder" {...props} bulkActionButtons={false}>
            <Datagrid rowClick="show">
                <ReferenceField label="Operator Ditugaskan" source="remindee" reference="user">
                    <TextField source="first_name" />
                </ReferenceField>
                <TextField source="notification_status" label='Status Laporan' />
                <DateField source="remind_date" label="Tanggal Peringatan Aktif" />
                <SelectField label="Tipe Laporan" source="report_type" choices={[
                   { id: 'yearly', name: 'Laporan Per Tahun' },
                   { id: 'semesterly', name: 'Laporan Per Semester' },
                ]} />
                { permissions === 'Kepala Fasyankes' || permissions === 'Admin' ? <EditButton /> : null}
                { permissions === 'Kepala Fasyankes' || permissions === 'Admin' ? <DeleteButton /> : null}
            </Datagrid>
        </List>
    )
}

export const NotifEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <SimpleForm toolbar={<NoDeleteToolbar/>}>
            <SelectInput source="notification_status" label='Status' choices={[
                { id: 'Belum Dikirim', name: 'Belum Dikirim' },
                { id: 'Peringatan Dikirim', name: 'Peringatan Dikirim' },
                { id: 'Laporan Dibuat', name: 'Laporan Dibuat' }
            ]} />
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
                <TextField source="username" />
            </ReferenceField>
            <DateField source="remind_date" />
            <SelectField source="report_type" choices={[
               { id: 'yearly', name: 'Laporan Per Tahun' },
               { id: 'semesterly', name: 'Laporan Per Semester' },
            ]} />

        </SimpleShowLayout>
    </Show>
);