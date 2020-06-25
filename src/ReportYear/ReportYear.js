import React from 'react';
import {Create, Edit, List, Show, Datagrid, SimpleShowLayout, SimpleForm, BooleanField, BooleanInput, DateInput, DateField, ReferenceField, TextField, TextInput, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab} from 'react-admin'
import PageTitle from '../Util/PageTitle';

export const ReportyearList = props => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <ReferenceField label="Penulis" source="author" reference="user" emptyText="test">
                <TextField source="username" />
            </ReferenceField>
            <ReferenceField label="Fasyankes" source="institution" reference="institution">
                <TextField source="name"/>
            </ReferenceField>
            <NumberField source="total" />
            <DateField source="year" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ReportyearEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="area" />
            <NumberInput source="total" />
            <BooleanInput source="report.question3.a.information" />
            <NumberInput source="__v" />
            <DateInput source="year" />
            <TextInput source="id" />
        </SimpleForm>
    </Edit>
);

export const ReportyearShow = props => (
    <Show {...props}>
    <TabbedShowLayout>
            <Tab label="Penulis">
                <TextField source="author" />
                <NumberField source="total" />
                <DateField source="year" />
                <TextField source="institution" />
            </Tab>
            <Tab label="Fasyankes" path="fasyankes">
                <ReferenceField label="Fasyankes" source="institution" reference="institution">
                    <TextField source="name"/>
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanField source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
                <BooleanField source="report.question1.b.information" label="b. Dokumen rencana kegiatan K3"/>
                <BooleanField source="report.question1.c.information" label="c. Ada Tim K3/Pengelola  K3"/>
                
                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanField source="report.question2.a.information" label="a. Identifikasi potensi bahaya"/>
                <BooleanField source="report.question2.b.information" label="b. Penilaian risiko"/>
                <BooleanField source="report.question2.c.information" label="c. Pengendalian Risiko"/>

                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanField source="report.question3.a.information" label="a. Sarana dan Prasarana Kebersihan Tangan"/>
                <BooleanField source="report.question3.b.information" label="b. Penyediaan APD"/>
                <BooleanField source="report.question3.c.information" label="c. Pengelolaan jarun dan alat tajam"/>
                <BooleanField source="report.question3.d.information" label="d. Dekontaminasi peralatan"/>

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanField source="report.question4.a.information" label="a. Angkat angkut pasien (pasien, barang, dan lain-lain), postur kerja"/>
                <BooleanField source="report.question4.b.information" label="b. Pengaturan shift kerja"/>
                <BooleanField source="report.question4.c.information" label="c. Pengaturan Tata Ruang Kerja"/>

                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanField source="report.question5.a.information" label="Pemeriksaan kesehatan SDM  Fasyankes"/>
                <BooleanField source="report.question5.b.information" label="a. Fasyankes melakukan pemeriksaan kesehatan berkala"/>
                <BooleanField source="report.question5.c.information" label="b. Fasyankes melakukan imunisasi pada SDM Fasyankes yang beresiko"/>

                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanField source="report.question6.a.information" label="a. Melakukan sosialisasi"/>
                <BooleanField source="report.question6.b.information" label="b. Media KIE"/>
                
                {/* Question 7 */}
                <p>7. Aspek Keselamatan dan Kesehatan  Kerja  pada Pengelolaan Bahan Beracun dan Berbahaya (B3)  dan Limbah Domestik</p>
                <BooleanField source="report.question7.a.information" label="a. Daftar inventaris B3"/>
                <BooleanField source="report.question7.b.information" label="b. SPO penggunaan B3"/>
                <BooleanField source="report.question7.c.information" label="c. Penyimpanan dan Pembuangan limbah B3 dan domestik sesuai persyaratan"/>
                
                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanField source="report.question8.a.information" label="a. Pengukuran pencahayaan, kualitas air, kualitas udara"/>
                <BooleanField source="report.question8.b.information" label="b. Pemeliharaan Kebersihan Bangunan"/>
                <BooleanField source="report.question8.c.information" label="c. Ketersediaan air dan listrik"/>
                <BooleanField source="report.question8.d.information" label="d. Ketersediaan toilet sesuai standar"/>
                
                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanField source="report.question9.information" label="a. Pemeliharaan pada peralatan medis"/>
                
                {/* Question 10 */}
                <p>10. Kesiapsiagaan menghadapi kondisi darurat/bencana</p>
                <BooleanField source="report.question10.a.information" label="a. SPO Penanganan Kondisi Darurat / Bencana"/>
                <BooleanField source="report.question10.b.a.information" label="b. Proteksi kebakaran"/>
                <TextField source="report.question10.b.b.information" label="- Aktif ( Jumlah APAR dan alat pemadam lainnya)"/>
                <TextField source="report.question10.b.c.information" label="- Pasif ( pintu dan tangga darurat, jalur evakuasi)"/>
                <p>c. Simulasi</p>
                <BooleanField source="report.question10.c.a.information" label="- Darurat Bencana"/>
                <BooleanField source="report.question10.c.b.information" label="- Penggunaan APAR"/>
                
                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanField source="report.question11.a.information" label="a. SDM Fasyankes terlatih K3"/>
                <TextField source="report.question11.b.information" label="b. Jumlah SDM Fasyankes yang terlatih K3"/>

            </Tab>

        </TabbedShowLayout>
    </Show>
);