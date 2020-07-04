import React from 'react';
import {Create, Edit, List, Show, Datagrid, SelectField, ReferenceField, TextField, TextInput, DateInput, DateField, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, SelectInput, ReferenceInput} from 'react-admin'
import PageTitle from '../Util/PageTitle';

export const ReportsemesterList = props => (
    <List title="Laporan per Semester" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="month" label="Bulan"/>
            <ReferenceField label="Penulis" source="author" reference="user">
                <TextField source="username"/>
            </ReferenceField>
            <DateField source="year" />
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
    			    { id: 'Februari', name: 'Februari' },
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
                <ReferenceInput label="Author" source="author" reference="user">
                    <SelectInput optionText="username"/>
                </ReferenceInput>
                <DateInput source="year" />
            </FormTab>
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. Jumlah SDM Fasyankes </p>
                <NumberInput source="report.question1.total" label="Jumlah"/>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberInput source="report.question2.total" label="Jumlah"/>
                <TextInput source="report.question2.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question3.total" label="Jumlah"/>
                <TextInput source="report.question3.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question4.total" label="Jumlah"/>
                <TextInput source="report.question4.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question5.total" label="Jumlah"/>
                <TextInput source="report.question5.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question6.total" label="Jumlah"/>
                <TextInput source="report.question6.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question7.total" label="Jumlah"/>
                <TextInput source="report.question7.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question8.total" label="Jumlah"/>
                <TextInput source="report.question8.detail" label="Keterangan"/>

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
                <ReferenceField label="Penulis" source="author" reference="user">
                    <TextField source="username"/>
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
    			    { id: 'Februari', name: 'Februari' },
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
                <ReferenceInput label="Author" source="author" reference="user">
                    <SelectInput optionText="username"/>
                </ReferenceInput>
                <DateInput source="year" />
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
                <NumberInput source="report.question2.total" label="Jumlah"/>
                <TextInput source="report.question2.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question3.total" label="Jumlah"/>
                <TextInput source="report.question3.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question4.total" label="Jumlah"/>
                <TextInput source="report.question4.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question5.total" label="Jumlah"/>
                <TextInput source="report.question5.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question6.total" label="Jumlah"/>
                <TextInput source="report.question6.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question7.total" label="Jumlah"/>
                <TextInput source="report.question7.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question8.total" label="Jumlah"/>
                <TextInput source="report.question8.detail" label="Keterangan"/>

            </FormTab>
        </TabbedForm>
    </Create>
);