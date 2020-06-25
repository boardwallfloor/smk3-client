import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, BooleanField, SelectField, BooleanInput, DateInput, DateField, ReferenceField, TextField, TextInput, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, SelectInput, ReferenceInput} from 'react-admin'
import PageTitle from '../Util/PageTitle';

export const ReportsemesterList = props => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="month" label="Bulan"/>
            <TextField source="author" label="Penulis"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ReportsemesterEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <TabbedForm>
            <FormTab label="Penulis">
            <SelectInput source="month" label="Bulan Penulisan" choices={[
			    { id: 'Januari', name: 'Januari' },
			    { id: 'Feburari', name: 'Feburari' },
			    { id: 'Maret', name: 'Maret' },
			    { id: 'April', name: 'April' },
			    { id: 'Mei', name: 'Mei' },
			    { id: 'Juni', name: 'Juni' },
			    { id: 'Juli', name: 'Juli' },
			    { id: 'Agustus', name: 'Agustus' },
			    { id: 'September', name: 'September' },
			    { id: 'Oktober', name: 'Oktober' },
			    { id: 'November', name: 'November' },
			    { id: 'Desember', name: 'Desember' },
			]} />
            <TextInput source="author" label="Penulis"/>
            </FormTab>
            <FormTab label="Fasyankes" path="institution">
                <ReferenceInput label="Fasyankes" source="institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. Jumlah SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

            </FormTab>
        </TabbedForm>
    </Edit>
);

export const ReportsemesterShow = props => (
    <Show title={<PageTitle action="Show"/>} {...props}>
        <TabbedShowLayout>
            <Tab label="Penulis">
	            <SelectField source="month" label="Bulan Penulisan" choices={[
				    { id: 'Januari', name: 'Januari' },
				    { id: 'Feburari', name: 'Feburari' },
				    { id: 'Maret', name: 'Maret' },
				    { id: 'April', name: 'April' },
				    { id: 'Mei', name: 'Mei' },
				    { id: 'Juni', name: 'Juni' },
				    { id: 'Juli', name: 'Juli' },
				    { id: 'Agustus', name: 'Agustus' },
				    { id: 'September', name: 'September' },
				    { id: 'Oktober', name: 'Oktober' },
				    { id: 'November', name: 'November' },
				    { id: 'Desember', name: 'Desember' },
				]} />
            <TextField source="author" label="Penulis"/>
            </Tab>
            <Tab label="Fasyankes" path="institution">
                <ReferenceField label="Fasyankes" source="institution" reference="institution">
                    <SelectField source="name"/>
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. Jumlah SDM Fasyankes </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <TextField source="report.question1.detail" label="Keterangan"/>

            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ReportsemesterCreate = props => (
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <TabbedForm>
            <FormTab label="Penulis">
            <SelectInput source="month" label="Bulan Penulisan" choices={[
			    { id: 'Januari', name: 'Januari' },
			    { id: 'Feburari', name: 'Feburari' },
			    { id: 'Maret', name: 'Maret' },
			    { id: 'April', name: 'April' },
			    { id: 'Mei', name: 'Mei' },
			    { id: 'Juni', name: 'Juni' },
			    { id: 'Juli', name: 'Juli' },
			    { id: 'Agustus', name: 'Agustus' },
			    { id: 'September', name: 'September' },
			    { id: 'Oktober', name: 'Oktober' },
			    { id: 'November', name: 'November' },
			    { id: 'Desember', name: 'Desember' },
			]} />
            <TextInput source="author" label="Penulis"/>
            </FormTab>
            <FormTab label="Fasyankes" path="institution">
                <ReferenceInput label="Fasyankes" source="institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. Jumlah SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>

            </FormTab>
        </TabbedForm>
    </Create>
);