import React from 'react';
import {Create, Edit, List, Show, DateField, ReferenceField, Datagrid, ShowButton, SimpleShowLayout, SimpleForm, TextField, EditButton, DeleteButton, ReferenceInput, SelectInput, DateInput, SelectField, useNotify} from 'react-admin'
import { usePermissions } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import PageTitle from '../Util/PageTitle';
import QuestionAccordion from '../Util/QuestionAccordion';
import {ExportButtonShow, ListActions} from '../Util/ActionBar';
import {NoDeleteToolbar} from '../Util/CustomToolbar'
import {NotifListFilter} from '../Util/Filter'

const useStyles = makeStyles({
    headerCell: {
        fontWeight: 'bold',
        borderBottom: 'solid black'
    },
});

export const NotifList = props => {
    const {permissions} = usePermissions();
    const classes = useStyles();

    const handleFilterPermanent = () => {
        if(permissions === "Operator"){
            const userid = localStorage.getItem('userid')
            return {remindee:userid}
            // return {}
        }
        if(permissions === 'Kepala Fasyankes'){
            const institution = localStorage.getItem('institution')
            return {institution:institution}
        }
    }

    return(
        <List title="Reminder" filter={handleFilterPermanent()} filters={<NotifListFilter />} {...props} actions={<ListActions />} bulkActionButtons={false}>
            <Datagrid classes={{ headerCell: classes.headerCell }} rowClick="show">
                <ReferenceField link={false} label="Operator Ditugaskan" source="remindee" reference="user">
                    <TextField source="first_name" />
                </ReferenceField>
                <TextField source="notification_status" label='Status Laporan' />
                <DateField options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" source="remind_date" label="Tanggal Peringatan Aktif" />
                <DateField options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" source="created_at" label="Tanggal Pembuatan Peringatan" />
                <SelectField label="Tipe Laporan" source="report_type" choices={[
                   { id: 'yearly', name: 'Per Tahun' },
                   { id: 'semesterly', name: 'Per Semester' },
                ]} />
                { permissions === 'Kepala Fasyankes' || permissions === 'Admin' ? <EditButton /> : null}
                { permissions === 'Kepala Fasyankes' || permissions === 'Admin' ? <DeleteButton /> : null}
            <ShowButton />
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
    const {permissions} = usePermissions();
    const notify = useNotify();

    const onFailure = (error) => {
        console.log(error)
        // if (error.code === '123') {
            notify(`${error.message}`, 'warning');
        // }
    }

    const handleFilterPermanent = () => {
        if(permissions === "Operator"){
            const userid = localStorage.getItem('userid')
            return {remindee:userid}
            // return {}
        }
        if(permissions === 'Kepala Fasyankes'){
            const institution = localStorage.getItem('institution')
            return {user_institution:institution, privilege: 'Operator'}
        }
    }

    return (
    <Create title={<PageTitle action="Creating"/>} {...props} onFailure={onFailure}>
        <SimpleForm>
            <QuestionAccordion text="Pilih username pegawai yang inginkan" question="Penulis Laporan" />
            <ReferenceInput filter={handleFilterPermanent()} label="Penulis Laporan" source="remindee" reference="user">
                <SelectInput optionText="username"/>
            </ReferenceInput>
            <QuestionAccordion text="Pilih tanggal peringatan untuk dikirim" question="Tanggal Pengiriman Peringatan" />
            <DateInput label="Tanggal Pengiriman Peringatan" source="remind_date" fullWidth/>
            <QuestionAccordion text="Pilih jenis laporan yang inginkan" question="Jenis Laporan" />
            <SelectInput source="report_type" label="Jenis Laporan" choices={[
                { id: 'yearly', name: 'Laporan Per Tahun' },
                { id: 'semesterly', name: 'Laporan Per Semester' }
            ]} />
        </SimpleForm>
    </Create>
    )
}

export const NotifShow = props => (
    <Show title={<PageTitle action="Show"/>} actions={<ExportButtonShow />} {...props}>
        <SimpleShowLayout>
            <ReferenceField link={false} label="Operator Ditugaskan" source="remindee" reference="user">
                <TextField source="username" />
            </ReferenceField>
            <DateField label="Tanggal Peringatan Aktif"  options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" source="remind_date" />
            <DateField label="Tanggal Pembuatan Peringatan" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" source="created_at" />
            <SelectField label="Tipe Laporan" source="report_type" choices={[
               { id: 'yearly', name: 'Laporan Per Tahun' },
               { id: 'semesterly', name: 'Laporan Per Semester' },
            ]} />

        </SimpleShowLayout>
    </Show>
);