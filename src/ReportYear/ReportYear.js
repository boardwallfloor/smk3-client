import React from 'react';
import {Create, Edit, List, Show, Datagrid, BooleanField, BooleanInput, DateInput, DateField, ReferenceField, TextField, TextInput, NumberField, NumberInput, EditButton, DeleteButton, TabbedShowLayout, Tab, TabbedForm, FormTab, SelectInput, ReferenceInput} from 'react-admin'

import PageTitle from '../Util/PageTitle';

export const ReportyearList = props => (
    <List title="Laporan per Tahun" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <ReferenceField label="Penulis" source="author" reference="user" emptyText="test">
                <TextField source="username" />
            </ReferenceField>
            <ReferenceField label="Fasyankes" source="institution" reference="institution">
                <TextField source="name"/>
            </ReferenceField>
            <NumberField source="total" />
            <NumberField source="area" />
            <DateField source="year" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ReportyearEdit = props => (
    <Edit title={<PageTitle action="Editing"/>} {...props}>
        <TabbedForm>
            <FormTab label="Penulis">
                <ReferenceInput label="Author" source="author" reference="user">
                    <SelectInput optionText="username"/>
                </ReferenceInput>
                <NumberInput source="total" />
                <NumberInput source="area" />
                <DateInput source="year" />
            </FormTab>
            <FormTab label="Fasyankes" path="institution">
                <ReferenceInput label="Fasyankes" source="institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanInput source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
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
        </TabbedForm>
    </Edit>
);

export const ReportyearShow = props => (
    <Show title={<PageTitle action="Show"/>} {...props}>
    <TabbedShowLayout>
            <Tab label="Penulis">
                <TextField source="author" />
                <NumberField source="total" />
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

export const ReportyearCreate = props => (
    <Create title={<PageTitle action="Creating"/>} {...props}>
        <TabbedForm>
            <FormTab label="Penulis">
                <ReferenceInput label="Author" source="author" reference="user">
                    <SelectInput optionText="username"/>
                </ReferenceInput>
                <NumberInput source="total" />
                <NumberInput source="area" />
                <DateInput source="year" />
            </FormTab>
            <FormTab label="Fasyankes" path="institution">
                <ReferenceInput label="Fasyankes" source="institution" reference="institution">
                    <SelectInput source="name"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanInput source="report.question1.a.information" label="a. Ada komitmen/kebijakan"/>
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
        </TabbedForm>
    </Create>
);
