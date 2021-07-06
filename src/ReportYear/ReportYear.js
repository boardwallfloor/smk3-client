import React from 'react';
import {Create, Edit, List, Show, Datagrid, BooleanField, BooleanInput, DateInput, DateField, ReferenceField, TextField, TextInput, ShowButton, NumberField, NumberInput, EditButton, FunctionField, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, FileField , FormDataConsumer} from 'react-admin'
import { makeStyles } from '@material-ui/core';

import PageTitle from '../Util/PageTitle';  
import FileUpload from '../Util/FileUpload';
import QuestionAccordion from '../Util/QuestionAccordion';
import {ExportButtonShow, ListActions} from '../Util/ActionBar';
import {NoDeleteToolbar} from '../Util/CustomToolbar'
import {ReportListFilter} from '../Util/Filter'

const useStyles = makeStyles({
    headerCell: {
        fontWeight: 'bold',
        borderBottom: 'solid black'
    },
});


export const ReportyearList = ({permissions, record, ...props}) => {
    const classes = useStyles();

    const handleFilterPermanent = () => {
        if(permissions === "Operator"){
            const userid = localStorage.getItem('userid')
            return {author:userid}
            // return {}
        }
    }

    const renderValidation = (record) => {
        if(record.validated === true){
            return 'Tervalidasi'
        }else{
            return 'Belum Tervalidasi'
        }
    }

    return(
        <List title="Laporan per Tahun" filter={handleFilterPermanent()} filters={<ReportListFilter />} actions={<ListActions />} {...props} bulkActionButtons={false}>
            <Datagrid classes={{ headerCell: classes.headerCell }} rowClick={permissions !== 'Kepala Fasyankes' ? "show" : "edit"}>
                <ReferenceField link={false} label="Penulis" source="author" reference="user" emptyText="test">
                    <TextField source="username" />
                </ReferenceField>
                <ReferenceField link={false} label="Fasyankes" source="institution" reference="institution">
                    <TextField source="name"/>
                </ReferenceField>
                <NumberField source="totalSDM" label='Total SDM' />
                <DateField label="Tanggal Laporan" source="year" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID"/>
                <FunctionField sortBy='validated' label="Status Validasi" render={record => renderValidation(record)} />
                { permissions === 'Operator' || permissions === 'Admin' ?
                <EditButton />
                :
                <ShowButton />
                }
                {permissions === 'Admin' ?
                <DeleteButton />
                :
                null
                }
                
            </Datagrid>
        </List>
    )
}

export const ReportyearEdit = ({permissions, ...props}) => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <TabbedForm toolbar={<NoDeleteToolbar/>}>
            { permissions ==='Kepala Fasyankes' && 
            <FormTab label="Validasi">
                <QuestionAccordion text="Aktifkan apabila laporan telah sesuai standar" question="Validasi Laporan" />
                <BooleanInput source='validated' label='Status Laporan'/>
            </FormTab>
            }
            { permissions === 'Operator' ?
            <FormTab label="Tanggal">
                <QuestionAccordion text="ID Penulis Laporan tidak dapat diubah" question='ID Penulis Laporan'/>
                <TextInput source='author' disabled/>
                <QuestionAccordion text="Jumlah Sumber Daya Manusia yang berada pada Fasyankes" question='Jumlah Sumber Daya Manusia'/>
                <NumberInput source="totalSDM" label='Jumlah Sumber Daya Manusia'/>
                <QuestionAccordion text="Tanggal Laporan" question='Tanggal Laporan'/>
                <DateInput source="year" label="Tanggal Laporan"/>
            </FormTab>
            : null}
            { permissions === 'Operator' ?
            <FormTab label="Fasyankes" path="institution">
                <QuestionAccordion text="ID Fasyankes hanya dapat diubah oleh administrator" question='ID Fasyankes Pelapor'/>
                <TextInput source='institution' disabled/>
            </FormTab>
            : null}
            { permissions === 'Operator' ? 
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanInput source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question1?.a?.information &&
                    <FileUpload sizeLimit="500000" source="report.question1.a.file" {...rest}/>
                 }
                </FormDataConsumer>
                <BooleanInput source="report.question1.b.information" label="b. Dokumen rencana kegiatan K3"/>
                <BooleanInput source="report.question1.c.information" label="c. Ada Tim K3/Pengelola  K3"/>
                
                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanInput source="report.question2.a.information" label="a. Identifikasi potensi bahaya"/>
                <BooleanInput source="report.question2.b.information" label="b. Penilaian risiko"/>
                <BooleanInput source="report.question2.c.information" label="c. Pengendalian Risiko"/>

                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanInput source="report.question3.a.information" label="a. Sarana dan Prasarana Kebersihan Tangan"/>
                <BooleanInput source="report.question3.b.information" label="b. Penyediaan APD"/>
                <BooleanInput source="report.question3.c.information" label="c. Pengelolaan jarun dan alat tajam"/>
                <BooleanInput source="report.question3.d.information" label="d. Dekontaminasi peralatan"/>

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanInput source="report.question4.a.information" label="a. Angkat angkut pasien (pasien, barang, dan lain-lain), postur kerja"/>
                <BooleanInput source="report.question4.b.information" label="b. Pengaturan shift kerja"/>
                <BooleanInput source="report.question4.c.information" label="c. Pengaturan Tata Ruang Kerja"/>

                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanInput source="report.question5.a.information" label="Pemeriksaan kesehatan SDM  Fasyankes"/>
                <BooleanInput source="report.question5.b.information" label="a. Fasyankes melakukan pemeriksaan kesehatan berkala"/>
                <BooleanInput source="report.question5.c.information" label="b. Fasyankes melakukan imunisasi pada SDM Fasyankes yang beresiko"/>

                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanInput source="report.question6.a.information" label="a. Melakukan sosialisasi"/>
                <BooleanInput source="report.question6.b.information" label="b. Media KIE"/>
                
                {/* Question 7 */}
                <p>7. Aspek Keselamatan dan Kesehatan  Kerja  pada Pengelolaan Bahan Beracun dan Berbahaya (B3)  dan Limbah Domestik</p>
                <BooleanInput source="report.question7.a.information" label="a. Daftar inventaris B3"/>
                <BooleanInput source="report.question7.b.information" label="b. SPO penggunaan B3"/>
                <BooleanInput source="report.question7.c.information" label="c. Penyimpanan dan Pembuangan limbah B3 dan domestik sesuai persyaratan"/>
                
                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanInput source="report.question8.a.information" label="a. Pengukuran pencahayaan, kualitas air, kualitas udara"/>
                <BooleanInput source="report.question8.b.information" label="b. Pemeliharaan Kebersihan Bangunan"/>
                <BooleanInput source="report.question8.c.information" label="c. Ketersediaan air dan listrik"/>
                <BooleanInput source="report.question8.d.information" label="d. Ketersediaan toilet sesuai standar"/>
                
                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanInput source="report.question9.information" label="a. Pemeliharaan pada peralatan medis"/>
                
                {/* Question 10 */}
                <p>10. Kesiapsiagaan menghadapi kondisi darurat/bencana</p>
                <BooleanInput source="report.question10.a.information" label="a. SPO Penanganan Kondisi Darurat / Bencana"/>
                <BooleanInput source="report.question10.b.a.information" label="b. Proteksi kebakaran"/>
                <QuestionAccordion text="Jumlah APAR dan alat pemadam lainnya" question='- Aktif'/>
                <TextInput source="report.question10.b.b.information" label="Aktif"/>
                <QuestionAccordion text="Pintu, tangga darurat, jalur evakuasi" question='- Pasif'/>
                <TextInput source="report.question10.b.c.information" label="Pasif "/>
                <p>c. Simulasi</p>
                <BooleanInput source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <BooleanInput source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanInput source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <p>b. Jumlah SDM Fasyankes yang terlatih K3</p>
                <TextInput source="report.question11.b.information" label="Jumlah SDM"/>

            </FormTab>
            : null}
        </TabbedForm>
    </Edit>
);

export const ReportyearShow = props => (
    <Show title={<PageTitle action="Show"/>} actions={<ExportButtonShow />} {...props}>
    <TabbedShowLayout>
            <Tab label="Penulis">
                <ReferenceField link={false} label="Penulis" source="author" reference="user">
                    <TextField source="username"/>
                </ReferenceField>
                <NumberField source="totalSDM" label="Jumlah SDM" />
                <DateField label="Tanggal Laporan" source="year" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} locales="id-ID"/>
            </Tab>
            <Tab label="Fasyankes" path="institution">
                <ReferenceField link={false} label="Fasyankes" source="institution" reference="institution">
                    <TextField source="name"/>
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanField source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
                <FileField label='File terlampir' source="report.question1.a.file.src" title="report.question1.a.file.title" />
                <BooleanField source="report.question1.b.information" label="b. Dokumen rencana kegiatan K3"/>
                <FileField label='File terlampir'  source="report.question1.b.file.src" title="report.question1.b.file.title" />
                <BooleanField source="report.question1.c.information" label="c. Ada Tim K3/Pengelola  K3"/>
                <FileField label='File terlampir'  source="report.question1.c.file.src" title="report.question1.c.file.title" />
                
                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanField source="report.question2.a.information" label="a. Identifikasi potensi bahaya"/>
                <FileField label='File terlampir'  source="report.question2.a.file.src" title="report.question2.a.file.title" />
                <BooleanField source="report.question2.b.information" label="b. Penilaian risiko"/>
                <FileField label='File terlampir'  source="report.question2.b.file.src" title="report.question2.b.file.title" />
                <BooleanField source="report.question2.c.information" label="c. Pengendalian Risiko"/>
                <FileField label='File terlampir'  source="report.question2.c.file.src" title="report.question2.c.file.title" />

                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanField source="report.question3.a.information" label="a. Sarana dan Prasarana Kebersihan Tangan"/>
                <FileField label='File terlampir'  source="report.question3.a.file.src" title="report.question3.a.file.title" />
                <BooleanField source="report.question3.b.information" label="b. Penyediaan APD"/>
                <FileField label='File terlampir'  source="report.question3.b.file.src" title="report.question3.b.file.title" />
                <BooleanField source="report.question3.c.information" label="c. Pengelolaan jarun dan alat tajam"/>
                <FileField label='File terlampir'  source="report.question3.c.file.src" title="report.question3.c.file.title" />
                <BooleanField source="report.question3.d.information" label="d. Dekontaminasi peralatan"/>
                <FileField label='File terlampir'  source="report.question3.d.file.src" title="report.question3.d.file.title" />

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanField source="report.question4.a.information" label="a. Angkat angkut pasien (pasien, barang, dan lain-lain), postur kerja"/>
                <FileField label='File terlampir'  source="report.question4.a.file.src" title="report.question4.a.file.title" />
                <BooleanField source="report.question4.b.information" label="b. Pengaturan shift kerja"/>
                <FileField label='File terlampir'  source="report.question4.b.file.src" title="report.question4.b.file.title" />
                <BooleanField source="report.question4.c.information" label="c. Pengaturan Tata Ruang Kerja"/>
                <FileField label='File terlampir'  source="report.question4.c.file.src" title="report.question4.c.file.title" />

                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanField source="report.question5.a.information" label="Pemeriksaan kesehatan SDM  Fasyankes"/>
                <FileField label='File terlampir'  source="report.question5.a.file.src" title="report.question5.a.file.title" />
                <BooleanField source="report.question5.b.information" label="a. Fasyankes melakukan pemeriksaan kesehatan berkala"/>
                <FileField label='File terlampir'  source="report.question5.b.file.src" title="report.question5.b.file.title" />
                <BooleanField source="report.question5.c.information" label="b. Fasyankes melakukan imunisasi pada SDM Fasyankes yang beresiko"/>
                <FileField label='File terlampir'  source="report.question5.c.file.src" title="report.question5.c.file.title" />

                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanField source="report.question6.a.information" label="a. Melakukan sosialisasi"/>
                <FileField label='File terlampir'  source="report.question6.a.file.src" title="report.question6.a.file.title" />
                <BooleanField source="report.question6.b.information" label="b. Media KIE"/>
                <FileField label='File terlampir'  source="report.question6.b.file.src" title="report.question6.b.file.title" />
                
                {/* Question 7 */}
                <p>7. Aspek Keselamatan dan Kesehatan  Kerja  pada Pengelolaan Bahan Beracun dan Berbahaya (B3)  dan Limbah Domestik</p>
                <BooleanField source="report.question7.a.information" label="a. Daftar inventaris B3"/>
                <FileField label='File terlampir'  source="report.question7.a.file.src" title="report.question7.a.file.title" />
                <BooleanField source="report.question7.b.information" label="b. SPO penggunaan B3"/>
                <FileField label='File terlampir'  source="report.question7.b.file.src" title="report.question7.b.file.title" />
                <BooleanField source="report.question7.c.information" label="c. Penyimpanan dan Pembuangan limbah B3 dan domestik sesuai persyaratan"/>
                <FileField label='File terlampir'  source="report.question7.c.file.src" title="report.question7.c.file.title" />
                
                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanField source="report.question8.a.information" label="a. Pengukuran pencahayaan, kualitas air, kualitas udara"/>
                <FileField label='File terlampir'  source="report.question8.a.file.src" title="report.question8.a.file.title" />
                <BooleanField source="report.question8.b.information" label="b. Pemeliharaan Kebersihan Bangunan"/>
                <FileField label='File terlampir'  source="report.question8.b.file.src" title="report.question8.b.file.title" />
                <BooleanField source="report.question8.c.information" label="c. Ketersediaan air dan listrik"/>
                <FileField label='File terlampir'  source="report.question8.c.file.src" title="report.question8.c.file.title" />
                <BooleanField source="report.question8.d.information" label="d. Ketersediaan toilet sesuai standar"/>
                <FileField label='File terlampir'  source="report.question8.d.file.src" title="report.question8.d.file.title" />
                
                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanField source="report.question9.information" label="a. Pemeliharaan pada peralatan medis"/>
                <FileField label='File terlampir'  source="report.question9.file.src" title="report.question9.file.title" />
                
                {/* Question 10 */}
                <p>10. Kesiapsiagaan menghadapi kondisi darurat/bencana</p>
                <BooleanField source="report.question10.a.information" label="a. SPO Penanganan Kondisi Darurat / Bencana"/>
                <FileField label='File terlampir'  source="report.question10.a.file.src" title="report.question10.a.file.title" />
                <BooleanField source="report.question10.b.a.information" label="b. Proteksi kebakaran"/>
                <FileField label='File terlampir'  source="report.question10.b.a.file.src" title="report.question10.b.a.file.title" />
                <TextField source="report.question10.b.b.information" label="Aktif"/>               
                <TextField source="report.question10.b.c.information" label="Pasif"/>
                <p>c. Simulasi</p>
                <BooleanField source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <FileField label='File terlampir'  source="report.question10.c.a.file.src" title="report.question10.c.a.file.title" />
                <BooleanField source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                <FileField label='File terlampir'  source="report.question10.c.a.file.src" title="report.question10.c.a.file.title" />
                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanField source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <FileField label='File terlampir'  source="report.question11.a.file.src" title="report.question11.a.file.title" />

                <TextField source="report.question11.b.information" label="b. Jumlah SDM Fasyankes yang terlatih K3"/>

            </Tab>

        </TabbedShowLayout>
    </Show>
);

export const ReportyearCreate = props => {
    const userId = localStorage.getItem('userid')
    const isntitutionid = localStorage.getItem('institution')
    return(
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <TabbedForm redirect="show">
            <FormTab label="Tanggal">
                <QuestionAccordion text="ID Penulis Laporan tidak dapat diubah" question='ID Penulis Laporan'/>
                <TextInput source='author' initialValue={userId} disabled/>
                <QuestionAccordion text="Jumlah Sumber Daya Manusia yang berada pada Fasyankes" question='Jumlah Sumber Daya Manusia'/>
                <NumberInput source="totalSDM" label='Jumlah Sumber Daya Manusia'/>
                <QuestionAccordion text="Tanggal Laporan" question='Tanggal Laporan'/>
                <DateInput source="year" label="Tanggal Laporan"/>
            </FormTab>
            <FormTab label="Fasyankes" path="institution">
                <QuestionAccordion text="ID Fasyankes hanya dapat diubah oleh administrator" question='ID Fasyankes Pelapor'/>
                <TextInput source='institution' initialValue={isntitutionid} disabled/>
            </FormTab>
            <FormTab label="Laporan" path="report">

                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanInput source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question1?.a?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question1.a.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <BooleanInput source="report.question1.b.information" label="b. Dokumen rencana kegiatan K3"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question1?.b?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question1.b.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>
                <BooleanInput source="report.question1.c.information" label="c. Ada Tim K3/Pengelola  K3"/>
                 <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question1?.c?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question1.c.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>

                
                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanInput source="report.question2.a.information" label="a. Identifikasi potensi bahaya"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question2?.a?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question2.a.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question2.b.information" label="b. Penilaian risiko"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question2?.b?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question2.b.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>


                <BooleanInput source="report.question2.c.information" label="c. Pengendalian Risiko"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => (formData?.report?.question2?.c?.information) ?
                    <FileUpload sizeLimit="500000" source="report.question2.c.file" {...rest}/>
                 : null
                 }
                </FormDataConsumer>


                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanInput source="report.question3.a.information" label="a. Sarana dan Prasarana Kebersihan Tangan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question3?.a?.information  &&
                    <FileUpload source="report.question3.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question3.b.information" label="b. Penyediaan APD"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question3?.b?.information  &&
                    <FileUpload source="report.question3.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question3.c.information" label="c. Pengelolaan jarun dan alat tajam"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question3?.c?.information  &&
                    <FileUpload source="report.question3.c.file" {...rest}/>
                 }
                </FormDataConsumer>
                
                <BooleanInput source="report.question3.d.information" label="d. Dekontaminasi peralatan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question3?.d?.information  &&
                    <FileUpload source="report.question3.d.file" {...rest}/>
                 }
                </FormDataConsumer>
                

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanInput source="report.question4.a.information" label="a. Angkat angkut pasien (pasien, barang, dan lain-lain), postur kerja"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question4?.a?.information  &&
                    <FileUpload source="report.question4.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question4.b.information" label="b. Pengaturan shift kerja"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question4?.b?.information  &&
                    <FileUpload source="report.question4.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question4.c.information" label="c. Pengaturan Tata Ruang Kerja"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question4?.c?.information  &&
                    <FileUpload source="report.question4.c.file" {...rest}/>
                 }
                </FormDataConsumer>


                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanInput source="report.question5.a.information" label="a. Pemeriksaan kesehatan SDM  Fasyankes"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question5?.a?.information  &&
                    <FileUpload source="report.question5.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question5.b.information" label="b. Fasyankes melakukan pemeriksaan kesehatan berkala"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question5?.b?.information  &&
                    <FileUpload source="report.question5.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question5.c.information" label="c. Fasyankes melakukan imunisasi pada SDM Fasyankes yang beresiko"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question5?.c?.information  &&
                    <FileUpload source="report.question5.c.file" {...rest}/>
                 }
                </FormDataConsumer>


                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanInput source="report.question6.a.information" label="a. Melakukan sosialisasi"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question6?.a?.information  &&
                    <FileUpload source="report.question6.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question6.b.information" label="b. Media KIE"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question6?.b?.information  &&
                    <FileUpload source="report.question6.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                
                {/* Question 7 */}
                <p>7. Aspek Keselamatan dan Kesehatan  Kerja  pada Pengelolaan Bahan Beracun dan Berbahaya (B3)  dan Limbah Domestik</p>
                <BooleanInput source="report.question7.a.information" label="a. Daftar inventaris B3"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question7?.a?.information  &&
                    <FileUpload source="report.question7.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question7.b.information" label="b. SPO penggunaan B3"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question7?.b?.information  &&
                    <FileUpload source="report.question7.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question7.c.information" label="c. Penyimpanan dan Pembuangan limbah B3 dan domestik sesuai persyaratan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question7?.c?.information  &&
                    <FileUpload source="report.question7.c.file" {...rest}/>
                 }
                </FormDataConsumer>

                
                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanInput source="report.question8.a.information" label="a. Pengukuran pencahayaan, kualitas air, kualitas udara"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question8?.a?.information  &&
                    <FileUpload source="report.question8.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question8.b.information" label="b. Pemeliharaan Kebersihan Bangunan"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question8?.b?.information  &&
                    <FileUpload source="report.question8.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question8.c.information" label="c. Ketersediaan air dan listrik"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question8?.c?.information  &&
                    <FileUpload source="report.question8.c.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question8.d.information" label="d. Ketersediaan toilet sesuai standar"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question8?.d?.information  &&
                    <FileUpload source="report.question8.d.file" {...rest}/>
                 }
                </FormDataConsumer>

                
                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanInput source="report.question9.information" label="a. Pemeliharaan pada peralatan medis"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question9?.information  &&
                    <FileUpload source="report.question9.file" {...rest}/>
                 }
                </FormDataConsumer>

                
                {/* Question 10 */}
                <p>10. Kesiapsiagaan menghadapi kondisi darurat/bencana</p>
                <BooleanInput source="report.question10.a.information" label="a. SPO Penanganan Kondisi Darurat / Bencana"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question10?.a?.information  &&
                    <FileUpload source="report.question10.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question10.b.a.information" label="b. Proteksi kebakaran"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question10?.b?.a?.information  &&
                    <FileUpload source="report.question10.b.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <TextInput source="report.question10.b.b.information" label="- Aktif ( Jumlah APAR dan alat pemadam lainnya)"/>
                <TextInput source="report.question10.b.c.information" label="- Pasif ( Pintu dan tangga darurat, jalur evakuasi)"/>
                <p>c. Simulasi</p>
                <BooleanInput source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question10?.c?.a?.information  &&
                    <FileUpload source="report.question10.c.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <BooleanInput source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question10?.c?.b?.information  &&
                    <FileUpload source="report.question10.c.b.file" {...rest}/>
                 }
                </FormDataConsumer>

                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanInput source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question11?.a?.information  &&
                    <FileUpload source="report.question11.a.file" {...rest}/>
                 }
                </FormDataConsumer>

                <TextInput source="report.question11.b.information" label="b. Jumlah SDM Fasyankes yang terlatih K3"/>


            </FormTab>
        </TabbedForm>
    </Create>
)};
