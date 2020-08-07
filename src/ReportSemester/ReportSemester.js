import React from 'react';
import {Create, Edit, List, Show, Datagrid, SelectField, ReferenceField, TextField, TextInput, DateInput, DateField, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, SelectInput, ReferenceInput, FileField,  FormDataConsumer} from 'react-admin'


import PageTitle from '../Util/PageTitle';
import FileUpload from '../Util/FileUpload';
import ActionBar from '../Util/ActionBar';

export const ReportsemesterList = props => (
    <List title="Laporan per Semester" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <ReferenceField label="Penulis" source="author" reference="user">
                <TextField source="username"/>
            </ReferenceField>
            <ReferenceField label="Fasyankes" source="institution" reference="institution">
                <TextField source="name"/>
            </ReferenceField>
            <DateField source="date" label='Tanggal pembuatan laporan' options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ReportsemesterEdit = props => {
    return(
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <TabbedForm>
            <FormTab label="Tanggal">
                <TextInput source='author' disabled/>
                <DateInput source="date" />
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
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question1?.total === 0 || formData?.report?.question1?.total  ) ?
                    <FileUpload sizeLimit="2000000" source="report.question1.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberInput source="report.question2.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question2?.total === 0 || formData?.report?.question2?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question2.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question2.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question3.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question3?.total === 0 || formData?.report?.question3?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question3.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question3.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question4.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question4?.total === 0 || formData?.report?.question4?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question4.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question4.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question5.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question5?.total === 0 || formData?.report?.question5?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question5.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question5.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question6.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question6?.total === 0 || formData?.report?.question6?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question6.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question6.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question7.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question7?.total === 0 || formData?.report?.question7?.total  ) ?
                    <FileUpload sizeLimit="2000000" source="report.question7.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question7.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question8.total" label="Jumlah"/>
                 <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question8?.total === 0 || formData?.report?.question8?.total  ) ?
                    <FileUpload sizeLimit="2000000" source="report.question8.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question8.detail" label="Keterangan"/>

            </FormTab>
        </TabbedForm>
    </Edit>
)};

export const ReportsemesterShow = props => (
    <Show title={<PageTitle action="Show"/>} actions={<ActionBar />} {...props}>
        <TabbedShowLayout>
            <Tab label="Penulis">
                <DateField source="date" label='Tanggal pembuatan laporan' options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID" />
                <ReferenceField label="Penulis" source="author" reference="user">
                    <TextField source="username"/>
                </ReferenceField>
            </Tab>
            <Tab label="Fasyankes" path="institution">
                <ReferenceField label="Fasyankes" source="institution" reference="institution">
                    <TextField source="name"/>
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. Jumlah SDM Fasyankes </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <FileField source="report.question1.file.src" label='File' title="report.question1.file.title" />
                <TextField source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberField source="report.question1.total" label="Jumlah"/>
                <FileField source="report.question1.file.src" title="report.question1.file.title"  label='File' />
                <TextField source="report.question1.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberField source="report.question2.total" label="Jumlah"/>
                <FileField source="report.question2.file.src" title="report.question2.file.title"  label='File' />
                <TextField source="report.question2.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberField source="report.question3.total" label="Jumlah"/>
                <FileField source="report.question3.file.src" title="report.question3.file.title"  label='File' />
                <TextField source="report.question3.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberField source="report.question5.total" label="Jumlah"/>
                <FileField source="report.question5.file.src" title="report.question5.file.title"  label='File' />
                <TextField source="report.question5.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberField source="report.question6.total" label="Jumlah"/>
                <FileField source="report.question6.file.src" title="report.question6.file.title"  label='File' />
                <TextField source="report.question6.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberField source="report.question7.total" label="Jumlah"/>
                <FileField source="report.question7.file.src" title="report.question7.file.title"  label='File' />
                <TextField source="report.question7.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberField source="report.question8.total" label="Jumlah"/>
                <FileField source="report.question8.file.src" title="report.question8.file.title"  label='File' />
                <TextField source="report.question8.detail" label="Keterangan"/>

            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ReportsemesterCreate = props => {
    const userId = localStorage.getItem('userid')
    return(
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <TabbedForm redirect="show">
            <FormTab label="Tanggal">
                <TextInput source='author' initialValue={userId} disabled/>
                <DateInput source="dates" />
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
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question1?.total === 0 || formData?.report?.question1?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question1.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question1.detail" label="Keterangan"/>
                
                {/* Question 2 */}
                <p>2. Jumlah SDM Fasyankes yang sakit </p>
                <NumberInput source="report.question2.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question2?.total === 0 || formData?.report?.question2?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question2.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question2.detail" label="Keterangan"/>

                {/* Question 3 */}
                <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
                <NumberInput source="report.question3.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question3?.total === 0 || formData?.report?.question3?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question3.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question3.detail" label="Keterangan"/>

                {/* Question 4 */}
                <p>4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes </p>
                <NumberInput source="report.question4.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question4?.total === 0 || formData?.report?.question4?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question4.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question4.detail" label="Keterangan"/>

                {/* Question 5 */}
                <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question5.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question5?.total === 0 || formData?.report?.question5?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question5.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question5.detail" label="Keterangan"/>

                {/* Question 6 */}
                <p>6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes</p>
                <NumberInput source="report.question6.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question6?.total === 0 || formData?.report?.question6?.total ) ?
                    <FileUpload sizeLimit="2000000" source="report.question6.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question6.detail" label="Keterangan"/>
                
                {/* Question 7 */}
                <p>7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>) pada SDM Fasyankes</p>
                <NumberInput source="report.question7.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question7?.total === 0 || formData?.report?.question7?.total  ) ?
                    <FileUpload sizeLimit="2000000" source="report.question7.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question7.detail" label="Keterangan"/>
                
                {/* Qustion 8 */}
                <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
                <NumberInput source="report.question8.total" label="Jumlah"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question8?.total === 0 || formData?.report?.question8?.total  ) ?
                    <FileUpload sizeLimit="2000000" source="report.question8.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <TextInput source="report.question8.detail" label="Keterangan"/>

            </FormTab>
        </TabbedForm>
    </Create>
);}