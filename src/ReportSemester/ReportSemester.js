import React from 'react'
import {
  Create,
  Edit,
  List,
  Show,
  Datagrid,
  TextField,
  ReferenceField,
  TextInput,
  DateInput,
  DateField,
  NumberField,
  NumberInput,
  SelectField,
  ShowButton,
  EditButton,
  DeleteButton,
  TabbedShowLayout,
  Tab,
  TabbedForm,
  FormTab,
  FileField,
  SelectInput,
  FormDataConsumer
} from 'react-admin'
import { makeStyles } from '@material-ui/core'

import PageTitle from '../Util/PageTitle'
import FileUpload from '../Util/FileUpload'
import QuestionAccordion from '../Util/QuestionAccordion'
import { ExportButtonShow, ListActions } from '../Util/ActionBar'
import { NoDeleteToolbar } from '../Util/CustomToolbar'
import { ReportListFilter } from '../Util/Filter'
import { reportSemesterQuestion } from './reportSemesterQuestion'

const useStyles = makeStyles({
  headerCell: {
    fontWeight: 'bold',
    borderBottom: 'solid black'
  },
  leftPadding: {
    marginLeft: '20px'
  }
})

const validationChoices = [
  { id: 'Tervalidasi', name: 'Tervalidasi' },
{ id: 'Belum Tervalidasi', name: 'Belum Tervalidasi' },
{ id: 'Butuh Revisi', name: 'Butuh Revisi' },
]

export const ReportsemesterList = ({ permissions, record, ...props }) => {
  const classes = useStyles()

  const handleFilterPermanent = () => {
    if (permissions === 'Operator') {
      const userid = localStorage.getItem('userid')
      return { author: userid }
      // return {}
    }
    if (permissions === 'Kepala Fasyankes') {
      const institution = localStorage.getItem('institution')
      return { institution: institution }
    }
  }

  // const renderValidation = (record) => {
  //  if (record.validated === true) {
  //    return 'Tervalidasi'
  //  } else {
  //    return 'Belum Tervalidasi'
  //  }
  //}

  return (
    <List
      {...props}
      filter={handleFilterPermanent()}
      title='Laporan per Semester'
      filters={<ReportListFilter permissions={permissions} />}
      actions={<ListActions />}
      bulkActionButtons={false}
    >
      <Datagrid
        classes={{ headerCell: classes.headerCell }}
        rowClick={permissions !== 'Kepala Fasyankes' ? 'show' : 'edit'}
      >
        <ReferenceField
          link={false}
          label='Penulis'
          source='author'
          reference='user'
        >
          <TextField source='username' />
        </ReferenceField>
        <ReferenceField
          link={false}
          label='Fasyankes'
          source='institution'
          reference='institution'
        >
          <TextField source='name' />
        </ReferenceField>
        <DateField
          source='date'
          label='Tanggal Laporan'
          options={{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }}
          locales='id-ID'
        />
        <SelectField
                    source="validated"
                    label="Status Validasi"
                    choices={validationChoices}
                />
        {permissions === 'Operator' || permissions === 'Admin'
          ? (
            <EditButton />
            )
          : (
            <ShowButton />
            )}
        {permissions === 'Admin' ? <DeleteButton /> : null}
      </Datagrid>
    </List>
  )
}

export const ReportsemesterEdit = ({ permissions, ...props }) => {
  return (
    <Edit title={<PageTitle action='Editing' />} {...props}>
      <TabbedForm toolbar={<NoDeleteToolbar />}>
        {permissions === 'Kepala Fasyankes' && (
          <FormTab label='Validasi'>
            <p>Aktifkan apabila laporan telah sesuai standar</p>

            <SelectInput source="validated" label="Status Laporan" choices={validationChoices}/>
          </FormTab>
        )}
        {permissions === 'Operator'
          ? (
            <FormTab label='Tanggal'>
              <QuestionAccordion
                text='ID Penulis Laporan tidak dapat diubah'
                question='ID Penulis Laporan'
              />
              <TextInput source='author' disabled />
              <QuestionAccordion
                text='Tanggal Laporan'
                question='Tanggal Laporan'
              />
              <DateInput source='date' />
            </FormTab>
            )
          : null}
        {permissions === 'Operator'
          ? (
            <FormTab label='Fasyankes' path='institution'>
              <QuestionAccordion
                text='ID Fasyankes hanya dapat diubah oleh administrator'
                question='ID Fasyankes Pelapor'
              />
              <TextInput source='institution' disabled />
            </FormTab>
            )
          : null}
        {permissions === 'Operator' ? (
          <FormTab label='Laporan' path='report'>
            {/* Question 1 */}
            <QuestionAccordion
              text='Jumlah SDM Fasyankes adalah jumlah SDM yang bekerja di Fasilitas Pelayanan Kesehatan.'
              question='1. Jumlah SDM Fasyankes'
            />
            <NumberInput
              source='report.question1.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question1?.total === 0 ||
                                formData?.report?.question1?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question1.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question1.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question1.comment'
              label='Komentar'
            />

            {/* Question 2 */}
            <QuestionAccordion
              text='Jumlah SDM Fasyankes yang sakit yaitu jumlah SDM Fasyankes yang sakit'
              question='2. Jumlah SDM Fasyankes yang sakit'
            />
            <NumberInput
              source='report.question2.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question2?.total === 0 ||
                                formData?.report?.question2?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question2.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question2.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question2.comment'
              label='Komentar'
            />

            {/* Question 3 */}
            <QuestionAccordion
              text='Jumlah  kasus  penyakit  umum  pada  SDM  Fasyankes  yaitu  jumlah  kasuspada  SDM Fasyankes  yang  terdiagnosis  penyakit  umum,  seperti  flu,batuk,  diare  dan  lain-lain (yang  tidak  berhubungan  dengan  pekerjaan)baik  penyakit  menular  maupun  tidak menular dalam pencatatan 1 SDMFasyankes bisa lebih dari 1 kasus penyakit'
              question='3. Jumlah SDM yang sakit'
            />
            <NumberInput
              source='report.question3.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question3?.total === 0 ||
                                formData?.report?.question3?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question3.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question3.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question3.comment'
              label='Komentar'
            />

            {/* Question 4 */}
            <QuestionAccordion
              text='Jumlah kasus dugaan penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit yang disebabkan oleh pekerjaan dan/atau lingkungan kerja termasuk penyakit terkait  kerja.  Penyakit  terkait  kerjaa dalah  penyakit  yang  mempunyai  beberapa  agen penyebab  dengan  faktor pekerjaan  dan  atau  lingkungan  kerja  memegang  peranan bersama denganfaktor risiko lainnya.'
              question='4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes'
            />
            <NumberInput
              source='report.question4.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question4?.total === 0 ||
                                formData?.report?.question4?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question4.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question4.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question4.comment'
              label='Komentar'
            />

            {/* Question 5 */}
            <QuestionAccordion
              text='Jumlah kasus penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit akibat  kerja  pada  SDM  Fasyankes  yang  dibuktikan  dengandiagnosis  klinis  Penyakit Akibat Kerja'
              question='5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes'
            />
            <NumberInput
              source='report.question5.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question5?.total === 0 ||
                                formData?.report?.question5?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question5.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question5.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question5.comment'
              label='Komentar'
            />

            {/* Question 6 */}
            <QuestionAccordion
              text='Jumlah  kasus  kecelakaan  akibat  kerja  pada  SDM  Fasyankes  yaitu  jumlahsemua kecelakaan  yang  terjadi  pada  SDM  Fasyankes  yang  berhubungan dengan  kerja, demikian  pula kecelakaan  yang  terjadi  dalam  perjalanan berangkat  kerja  dari  rumah menuju tempat kerja dan pulang ke rumah melalui jalan yang biasa atau wajar dilalui.'
              question='6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes'
            />
            <NumberInput
              source='report.question6.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question6?.total === 0 ||
                                formData?.report?.question6?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question6.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question6.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question6.comment'
              label='Komentar'
            />

            {/* Question 7 */}
            <QuestionAccordion
              text='Jumlah  Kasus  kejadian  hampir  celaka  (near  miss)  pada  SDM  Fasyankes yaitu  suatu kejadian  insiden  yang  hampir  menimbulkan  cedera  atau celaka  seperti  terpeleset,kejatuhan benda, namun tidak mengenai manusia'
              question='7. Jumlah kasus kejadian hampir celaka pada SDM Fasyankes'
            />
            <NumberInput
              source='report.question7.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question7?.total === 0 ||
                                formData?.report?.question7?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question7.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question7.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question7.comment'
              label='Komentar'
            />

            {/* Qustion 8 */}
            <QuestionAccordion
              text='Jumlah  hari absen  SDM  Fasyankes  karena  sakit  yaitu  jumlah  hari  kerja hilang  SDM Fasyankes karena sakit'
              question='8. Jumlah hari absen SDM Fasyankes karena sakit'
            />
            <NumberInput
              source='report.question8.total'
              label='Jumlah'
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.report?.question8?.total === 0 ||
                                formData?.report?.question8?.total
                  ? (
                    <FileUpload
                      sizeLimit='2000000'
                      source='report.question8.file'
                      {...rest}
                    />
                    )
                  : null}
            </FormDataConsumer>
            <TextInput
              source='report.question8.detail'
              label='Keterangan'
            />
            <TextField
              source='report.question8.comment'
              label='Komentar'
            />
          </FormTab>
        ) : null}
        {permissions === 'Kepala Fasyankes'
          ? (
            <FormTab label='Laporan' path='report'>
              {/* Question 1 */}
              <QuestionAccordion
                text='Jumlah SDM Fasyankes adalah jumlah SDM yang bekerja di Fasilitas Pelayanan Kesehatan.'
                question='1. Jumlah SDM Fasyankes'
              />
              <NumberField
                source='report.question1.total'
                label='Jumlah'
              />
              <FileField
          source='report.question1.file.src'
          label='File terlampir'
          title='report.question1.file.title'
        />
              <TextField
                source='report.question1.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question1.comment'
                label='Komentar'
              />

              {/* Question 2 */}
              <QuestionAccordion
                text='Jumlah SDM Fasyankes yang sakit yaitu jumlah SDM Fasyankes yang sakit'
                question='2. Jumlah SDM Fasyankes yang sakit'
              />
              <NumberField
                source='report.question2.total'
                label='Jumlah'
              />
             
              <TextField
                source='report.question2.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question2.comment'
                label='Komentar'
              />

              {/* Question 3 */}
              <QuestionAccordion
                text='Jumlah  kasus  penyakit  umum  pada  SDM  Fasyankes  yaitu  jumlah  kasuspada  SDM Fasyankes  yang  terdiagnosis  penyakit  umum,  seperti  flu,batuk,  diare  dan  lain-lain (yang  tidak  berhubungan  dengan  pekerjaan)baik  penyakit  menular  maupun  tidak menular dalam pencatatan 1 SDMFasyankes bisa lebih dari 1 kasus penyakit'
                question='3. Jumlah SDM yang sakit'
              />
              <NumberField
                source='report.question3.total'
                label='Jumlah'
              />
             
              <TextField
                source='report.question3.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question3.comment'
                label='Komentar'
              />

              {/* Question 4 */}
              <QuestionAccordion
                text='Jumlah kasus dugaan penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit yang disebabkan oleh pekerjaan dan/atau lingkungan kerja termasuk penyakit terkait  kerja.  Penyakit  terkait  kerjaa dalah  penyakit  yang  mempunyai  beberapa  agen penyebab  dengan  faktor pekerjaan  dan  atau  lingkungan  kerja  memegang  peranan bersama denganfaktor risiko lainnya.'
                question='4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM Fasyankes'
              />
              <NumberField
                source='report.question4.total'
                label='Jumlah'
              />
             
              <TextField
                source='report.question4.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question4.comment'
                label='Komentar'
              />

              {/* Question 5 */}
              <QuestionAccordion
                text='Jumlah kasus penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit akibat  kerja  pada  SDM  Fasyankes  yang  dibuktikan  dengandiagnosis  klinis  Penyakit Akibat Kerja'
                question='5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes'
              />
              <NumberField
                source='report.question5.total'
                label='Jumlah'
              />
             

              {/* Question 6 */}
              <QuestionAccordion
                text='Jumlah  kasus  kecelakaan  akibat  kerja  pada  SDM  Fasyankes  yaitu  jumlahsemua kecelakaan  yang  terjadi  pada  SDM  Fasyankes  yang  berhubungan dengan  kerja, demikian  pula kecelakaan  yang  terjadi  dalam  perjalanan berangkat  kerja  dari  rumah menuju tempat kerja dan pulang ke rumah melalui jalan yang biasa atau wajar dilalui.'
                question='6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes'
              />
              <NumberField
                source='report.question6.total'
                label='Jumlah'
              />
             
              <TextField
                source='report.question6.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question6.comment'
                label='Komentar'
              />

              {/* Question 7 */}
              <QuestionAccordion
                text='Jumlah  Kasus  kejadian  hampir  celaka  (near  miss)  pada  SDM  Fasyankes yaitu  suatu kejadian  insiden  yang  hampir  menimbulkan  cedera  atau celaka  seperti  terpeleset,kejatuhan benda, namun tidak mengenai manusia'
                question='7. Jumlah kasus kejadian hampir celaka pada SDM Fasyankes'
              />
              <NumberField
                source='report.question7.total'
                label='Jumlah'
              />
              
              <TextField
                source='report.question7.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question7.comment'
                label='Komentar'
              />

              {/* Qustion 8 */}
              <QuestionAccordion
                text='Jumlah  hari absen  SDM  Fasyankes  karena  sakit  yaitu  jumlah  hari  kerja hilang  SDM Fasyankes karena sakit'
                question='8. Jumlah hari absen SDM Fasyankes karena sakit'
              />
              <NumberField
                source='report.question8.total'
                label='Jumlah'
              />
            
              <TextField
                source='report.question8.detail'
                label='Keterangan'
              />
              <TextInput
                source='report.question8.comment'
                label='Komentar'
              />
            </FormTab>
            ) : null}
      </TabbedForm>
    </Edit>
  )
}

export const ReportsemesterShow = (props) => (
  <Show
    title={<PageTitle action='Show' />}
    actions={<ExportButtonShow />}
    {...props}
  >
    <TabbedShowLayout>
      <Tab label='Penulis'>
        <DateField
          source='date'
          label='Tanggal Laporan'
          options={{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }}
          locales='id-ID'
        />
        <ReferenceField
          link={false}
          label='Penulis'
          source='author'
          reference='user'
        >
          <TextField source='username' />
        </ReferenceField>
      </Tab>
      <Tab label='Fasyankes' path='institution'>
        <ReferenceField
          link={false}
          label='Fasyankes'
          source='institution'
          reference='institution'
        >
          <TextField source='name' />
        </ReferenceField>
      </Tab>
      <Tab label='Laporan' path='report'>
        {/* Question 1 */}
        <p>1. Jumlah SDM Fasyankes </p>
        <NumberField source='report.question1.total' label='Jumlah' />
        <FileField
          source='report.question1.file.src'
          label='File terlampir'
          title='report.question1.file.title'
        />
        <TextField
          source='report.question1.detail'
          label='Keterangan'
        />

        {/* Question 2 */}
        <p>2. Jumlah SDM Fasyankes yang sakit </p>
        <NumberField source='report.question2.total' label='Jumlah' />
        <FileField
          source='report.question2.file.src'
          title='report.question2.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question2.detail'
          label='Keterangan'
        />

        {/* Question 3 */}
        <p>3. Jumlah kasus penyakit umum pada SDM Fasyankes </p>
        <NumberField source='report.question3.total' label='Jumlah' />
        <FileField
          source='report.question3.file.src'
          title='report.question3.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question3.detail'
          label='Keterangan'
        />

        {/* Question 4 */}
        <p>
          4. Jumlah kasus dugaan penyakit akibat kerja pada suatu SDM
          Fasyankes{' '}
        </p>
        <NumberField source='report.question4.total' label='Jumlah' />
        <FileField
          source='report.question4.file.src'
          title='report.question4.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question4.detail'
          label='Keterangan'
        />

        {/* Question 5 */}
        <p>5. Jumlah kasus penyakit akibat kerja pada SDM Fasyankes</p>
        <NumberField source='report.question5.total' label='Jumlah' />
        <FileField
          source='report.question5.file.src'
          title='report.question5.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question5.detail'
          label='Keterangan'
        />

        {/* Question 6 */}
        <p>
          6. Jumlah kasus kecelakaan akibat kerja pada SDM Fasyankes
        </p>
        <NumberField source='report.question6.total' label='Jumlah' />
        <FileField
          source='report.question6.file.src'
          title='report.question6.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question6.detail'
          label='Keterangan'
        />

        {/* Question 7 */}
        <p>
          7. Jumlah kasus kejadian hampir celaka(<i>near misses</i>)
          pada SDM Fasyankes
        </p>
        <NumberField source='report.question7.total' label='Jumlah' />
        <FileField
          source='report.question7.file.src'
          title='report.question7.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question7.detail'
          label='Keterangan'
        />

        {/* Qustion 8 */}
        <p>8. Jumlah hari absen SDM Fasyankes karena sakit</p>
        <NumberField source='report.question8.total' label='Jumlah' />
        <FileField
          source='report.question8.file.src'
          title='report.question8.file.title'
          label='File terlampir'
        />
        <TextField
          source='report.question8.detail'
          label='Keterangan'
        />
      </Tab>
    </TabbedShowLayout>
  </Show>
)

export const ReportsemesterCreate = (props) => {
  const userId = localStorage.getItem('userid')
  const isntitutionid = localStorage.getItem('institution')
  return (
    <Create title={<PageTitle action='Creating' />} {...props}>
      <TabbedForm redirect='show'>
        <FormTab label='Tanggal'>
          <QuestionAccordion
            text='ID Penulis Laporan tidak dapat diubah'
            question='ID Penulis Laporan'
          />
          <TextInput source='author' initialValue={userId} disabled />
          <QuestionAccordion
            text='Tanggal Laporan'
            question='Tanggal Laporan'
          />
          <DateInput source='date' />
        </FormTab>
        <FormTab label='Fasyankes' path='institution'>
          <QuestionAccordion
            text='ID Fasyankes hanya dapat diubah oleh administrator'
            question='ID Fasyankes Pelapor'
          />
          <TextInput
            source='institution'
            initialValue={isntitutionid}
            disabled
          />
        </FormTab>
        <FormTab label='Laporan' path='report'>
          {/* Question 1 */}
          <QuestionAccordion
            text='Jumlah semua SDM Fasyankes yang ada di Fasilitas Pelayanan Kesehatan.'
            question={`1. ${reportSemesterQuestion[0].question}`}
          />
          <NumberInput
            source='report.question1.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question1?.total === 0 ||
                            formData?.report?.question1?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question1.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question1.detail'
            label='Keterangan'
          />

          {/* Question 2 */}
          <QuestionAccordion
            text='Jumlah SDM Fasyankes yang sakit yaitu jumlah SDM Fasyankes yang sakit'
            question={`2. ${reportSemesterQuestion[1].question}`}
          />
          <NumberInput
            source='report.question2.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question2?.total === 0 ||
                            formData?.report?.question2?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question2.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question2.detail'
            label='Keterangan'
          />

          {/* Question 3 */}
          <QuestionAccordion
            text='Jumlah  kasus  penyakit  umum  pada  SDM  Fasyankes  yaitu  jumlah  kasuspada  SDM Fasyankes  yang  terdiagnosis  penyakit  umum,  seperti  flu,batuk,  diare  dan  lain-lain (yang  tidak  berhubungan  dengan  pekerjaan)baik  penyakit  menular  maupun  tidak menular dalam pencatatan 1 SDMFasyankes bisa lebih dari 1 kasus penyakit'
            question={`3. ${reportSemesterQuestion[2].question}`}
          />
          <NumberInput
            source='report.question3.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question3?.total === 0 ||
                            formData?.report?.question3?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question3.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question3.detail'
            label='Keterangan'
          />

          {/* Question 4 */}
          <QuestionAccordion
            text='Jumlah kasus dugaan penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit yang disebabkan oleh pekerjaan dan/atau lingkungan kerja termasuk penyakit terkait  kerja.  Penyakit  terkait  kerjaa dalah  penyakit  yang  mempunyai  beberapa  agen penyebab  dengan  faktor pekerjaan  dan  atau  lingkungan  kerja  memegang  peranan bersama denganfaktor risiko lainnya.'
            question={`4. ${reportSemesterQuestion[3].question}`}
          />
          <NumberInput
            source='report.question4.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question4?.total === 0 ||
                            formData?.report?.question4?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question4.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question4.detail'
            label='Keterangan'
          />

          {/* Question 5 */}
          <QuestionAccordion
            text='Jumlah kasus penyakit akibat kerja pada SDM Fasyankes yaitu jumlah kasus penyakit akibat  kerja  pada  SDM  Fasyankes  yang  dibuktikan  dengandiagnosis  klinis  Penyakit Akibat Kerja'
            question={`5. ${reportSemesterQuestion[4].question}`}
          />
          <NumberInput
            source='report.question5.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question5?.total === 0 ||
                            formData?.report?.question5?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question5.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question5.detail'
            label='Keterangan'
          />

          {/* Question 6 */}
          <QuestionAccordion
            text='Jumlah  kasus  kecelakaan  akibat  kerja  pada  SDM  Fasyankes  yaitu  jumlahsemua kecelakaan  yang  terjadi  pada  SDM  Fasyankes  yang  berhubungan dengan  kerja, demikian  pula kecelakaan  yang  terjadi  dalam  perjalanan berangkat  kerja  dari  rumah menuju tempat kerja dan pulang ke rumah melalui jalan yang biasa atau wajar dilalui.'
            question={`6. ${reportSemesterQuestion[5].question}`}
          />
          <NumberInput
            source='report.question6.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question6?.total === 0 ||
                            formData?.report?.question6?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question6.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question6.detail'
            label='Keterangan'
          />

          {/* Question 7 */}
          <QuestionAccordion
            text='Jumlah  Kasus  kejadian  hampir  celaka  (near  miss)  pada  SDM  Fasyankes yaitu  suatu kejadian  insiden  yang  hampir  menimbulkan  cedera  atau celaka  seperti  terpeleset,kejatuhan benda, namun tidak mengenai manusia'
            question={`7. ${reportSemesterQuestion[6].question}`}
          />
          <NumberInput
            source='report.question7.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question7?.total === 0 ||
                            formData?.report?.question7?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question7.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question7.detail'
            label='Keterangan'
          />

          {/* Qustion 8 */}
          <QuestionAccordion
            text='Jumlah  hari absen  SDM  Fasyankes  karena  sakit  yaitu  jumlah  hari  kerja hilang  SDM Fasyankes karena sakit'
            question={`8. ${reportSemesterQuestion[7].question}`}
          />
          <NumberInput
            source='report.question8.total'
            label='Jumlah'
          />
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData?.report?.question8?.total === 0 ||
                            formData?.report?.question8?.total
                ? (
                  <FileUpload
                    sizeLimit='2000000'
                    source='report.question8.file'
                    {...rest}
                  />
                  )
                : null}
          </FormDataConsumer>
          <TextInput
            source='report.question8.detail'
            label='Keterangan'
          />
        </FormTab>
      </TabbedForm>
    </Create>
  )
}
