import React from 'react';
import {Create, Edit, List, Show, Datagrid, BooleanField, BooleanInput, DateInput, DateField, ReferenceField, TextField, TextInput, ShowButton, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, SelectInput, ReferenceInput, FileField, FormDataConsumer} from 'react-admin'

import PageTitle from '../Util/PageTitle';  
import ActionBar from '../Util/ActionBar';
import FileUpload from '../Util/FileUpload';
import QuestionAccordion from '../Util/QuestionAccordion';

export const ReportyearList = ({permissions, record, ...props}) => (
    <List title="Laporan per Tahun" {...props} bulkActionButtons={false}>
        <Datagrid rowClick={permissions !== 'Kepala Fasyankes' ? "show" : "edit"}>
            <ReferenceField label="Penulis" source="author" reference="user" emptyText="test">
                <TextField source="username" />
            </ReferenceField>
            <ReferenceField label="Fasyankes" source="institution" reference="institution">
                <TextField source="name"/>
            </ReferenceField>
            <NumberField source="totalSDM" label='Total SDM' />
            <DateField source="year" />
            <BooleanField source="validated" label='Status Validasi' />
            {record && record.validated ? <p>Sudah Validasi</p> : <p>Belum Validasi </p>}
            { permissions === 'Operator' || permissions === 'Admin' ?
            <EditButton />
            :
            <ShowButton />
            }
            { permissions === 'Operator' || permissions === 'Admin' ?
            <DeleteButton />
            :
            null
            }
            
        </Datagrid>
    </List>
);

export const ReportyearEdit = ({permissions, ...props}) => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <TabbedForm>
            { permissions ==='Kepala Fasyankes' && 
            <FormTab label="Validasi">
            <QuestionAccordion text="Aktifkan apabila laporan telah sesuai standar" question="Validasi Laporan" />
                <BooleanInput source='validated' label='Status Laporan'/>
            </FormTab>
            }
            { permissions === 'Operator' ?
            <FormTab label="Tanggal">
                <TextInput source='author' disabled/>
                <NumberInput source="totalSDM" label='Jumlah Sumber Daya Manusia'/>
                <DateInput source="year" />
            </FormTab>
            : null}
            { permissions === 'Operator' ?
            <FormTab label="Fasyankes" path="institution">
                <ReferenceInput label="Fasyankes" source="institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
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
                <TextInput source="report.question10.b.b.information" label="- Aktif ( Jumlah APAR dan alat pemadam lainnya)"/>
                <TextInput source="report.question10.b.c.information" label="- Pasif ( pintu dan tangga darurat, jalur evakuasi)"/>
                <p>c. Simulasi</p>
                <BooleanInput source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <BooleanInput source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanInput source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <TextInput source="report.question11.b.information" label="b. Jumlah SDM Fasyankes yang terlatih K3"/>

            </FormTab>
            : null}
        </TabbedForm>
    </Edit>
);

export const ReportyearShow = props => (
    <Show title={<PageTitle action="Show"/>} actions={<ActionBar />} {...props}>
    <TabbedShowLayout>
            <Tab label="Penulis">
                <TextField source="author" />
                <NumberField source="totalSDM" label="Jumlah SDM" />
                <TextField source="institution" />
                <DateField source="year" label="Tahun Penulisan"/>
            </Tab>
            <Tab label="Fasyankes" path="institution">
                <ReferenceField label="Fasyankes" source="institution" reference="institution">
                    <TextField source="name"/>
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanField source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
                <FileField source="report.question1.a.file.src" title="report.question1.a.file.title" />
                <BooleanField source="report.question1.b.information" label="b. Dokumen rencana kegiatan K3"/>
                <FileField source="report.question1.b.file.src" title="report.question1.b.file.title" />
                <BooleanField source="report.question1.c.information" label="c. Ada Tim K3/Pengelola  K3"/>
                <FileField source="report.question1.c.file.src" title="report.question1.c.file.title" />
                
                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanField source="report.question2.a.information" label="a. Identifikasi potensi bahaya"/>
                <FileField source="report.question2.a.file.src" title="report.question2.a.file.title" />
                <BooleanField source="report.question2.b.information" label="b. Penilaian risiko"/>
                <FileField source="report.question2.b.file.src" title="report.question2.b.file.title" />
                <BooleanField source="report.question2.c.information" label="c. Pengendalian Risiko"/>
                <FileField source="report.question2.c.file.src" title="report.question2.c.file.title" />

                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanField source="report.question3.a.information" label="a. Sarana dan Prasarana Kebersihan Tangan"/>
                <FileField source="report.question3.a.file.src" title="report.question3.a.file.title" />
                <BooleanField source="report.question3.b.information" label="b. Penyediaan APD"/>
                <FileField source="report.question3.b.file.src" title="report.question3.b.file.title" />
                <BooleanField source="report.question3.c.information" label="c. Pengelolaan jarun dan alat tajam"/>
                <FileField source="report.question3.c.file.src" title="report.question3.c.file.title" />
                <BooleanField source="report.question3.d.information" label="d. Dekontaminasi peralatan"/>
                <FileField source="report.question3.d.file.src" title="report.question3.d.file.title" />

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanField source="report.question4.a.information" label="a. Angkat angkut pasien (pasien, barang, dan lain-lain), postur kerja"/>
                <FileField source="report.question4.a.file.src" title="report.question4.a.file.title" />
                <BooleanField source="report.question4.b.information" label="b. Pengaturan shift kerja"/>
                <FileField source="report.question4.b.file.src" title="report.question4.b.file.title" />
                <BooleanField source="report.question4.c.information" label="c. Pengaturan Tata Ruang Kerja"/>
                <FileField source="report.question4.c.file.src" title="report.question4.c.file.title" />

                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanField source="report.question5.a.information" label="Pemeriksaan kesehatan SDM  Fasyankes"/>
                <FileField source="report.question5.a.file.src" title="report.question5.a.file.title" />
                <BooleanField source="report.question5.b.information" label="a. Fasyankes melakukan pemeriksaan kesehatan berkala"/>
                <FileField source="report.question5.b.file.src" title="report.question5.b.file.title" />
                <BooleanField source="report.question5.c.information" label="b. Fasyankes melakukan imunisasi pada SDM Fasyankes yang beresiko"/>
                <FileField source="report.question5.c.file.src" title="report.question5.c.file.title" />

                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanField source="report.question6.a.information" label="a. Melakukan sosialisasi"/>
                <FileField source="report.question6.a.file.src" title="report.question6.a.file.title" />
                <BooleanField source="report.question6.b.information" label="b. Media KIE"/>
                <FileField source="report.question6.b.file.src" title="report.question6.b.file.title" />
                
                {/* Question 7 */}
                <p>7. Aspek Keselamatan dan Kesehatan  Kerja  pada Pengelolaan Bahan Beracun dan Berbahaya (B3)  dan Limbah Domestik</p>
                <BooleanField source="report.question7.a.information" label="a. Daftar inventaris B3"/>
                <FileField source="report.question7.a.file.src" title="report.question7.a.file.title" />
                <BooleanField source="report.question7.b.information" label="b. SPO penggunaan B3"/>
                <FileField source="report.question7.b.file.src" title="report.question7.b.file.title" />
                <BooleanField source="report.question7.c.information" label="c. Penyimpanan dan Pembuangan limbah B3 dan domestik sesuai persyaratan"/>
                <FileField source="report.question7.c.file.src" title="report.question7.c.file.title" />
                
                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanField source="report.question8.a.information" label="a. Pengukuran pencahayaan, kualitas air, kualitas udara"/>
                <FileField source="report.question8.a.file.src" title="report.question8.a.file.title" />
                <BooleanField source="report.question8.b.information" label="b. Pemeliharaan Kebersihan Bangunan"/>
                <FileField source="report.question8.b.file.src" title="report.question8.b.file.title" />
                <BooleanField source="report.question8.c.information" label="c. Ketersediaan air dan listrik"/>
                <FileField source="report.question8.c.file.src" title="report.question8.c.file.title" />
                <BooleanField source="report.question8.d.information" label="d. Ketersediaan toilet sesuai standar"/>
                <FileField source="report.question8.d.file.src" title="report.question8.d.file.title" />
                
                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanField source="report.question9.information" label="a. Pemeliharaan pada peralatan medis"/>
                <FileField source="report.question9.file.src" title="report.question9.file.title" />
                
                {/* Question 10 */}
                <p>10. Kesiapsiagaan menghadapi kondisi darurat/bencana</p>
                <BooleanField source="report.question10.a.information" label="a. SPO Penanganan Kondisi Darurat / Bencana"/>
                <FileField source="report.question10.a.file.src" title="report.question10.a.file.title" />
                <BooleanField source="report.question10.b.a.information" label="b. Proteksi kebakaran"/>
                <FileField source="report.question10.b.a.file.src" title="report.question10.b.a.file.title" />
                <TextField source="report.question10.b.b.information" label="- Aktif ( Jumlah APAR dan alat pemadam lainnya)"/>
                <TextField source="report.question10.b.c.information" label="- Pasif ( pintu dan tangga darurat, jalur evakuasi)"/>
                <p>c. Simulasi</p>
                <BooleanField source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <FileField source="report.question10.c.a.file.src" title="report.question10.c.a.file.title" />
                <BooleanField source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                <FileField source="report.question10.c.a.file.src" title="report.question10.c.a.file.title" />
                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanField source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <FileField source="report.question11.a.file.src" title="report.question11.a.file.title" />
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
                <TextInput source='author' initialValue={userId} disabled/>
                <NumberInput source="totalSDM" label='Jumlah Sumber Daya Manusia'/>
                <DateInput source="year" />
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
