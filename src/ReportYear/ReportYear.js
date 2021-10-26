import React from "react";
import {
    Create,
    Edit,
    List,
    Show,
    Datagrid,
    BooleanField,
    DateInput,
    DateField,
    ReferenceField,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    SelectField,
    DeleteButton,
    TabbedShowLayout,
    Tab,
    TabbedForm,
    FormTab,
    FileField,
    FormDataConsumer,
    required,
    SelectInput
} from "react-admin";
import { makeStyles } from "@material-ui/core";

import PageTitle from "../Util/PageTitle";
import FileUpload from "../Util/FileUpload";
import QuestionAccordion from "../Util/QuestionAccordion";
import SwitchWithSign from "../Util/SwitchWithSign";
import { ExportButtonShow, ListActions } from "../Util/ActionBar";
import { NoDeleteToolbar } from "../Util/CustomToolbar";
import { ReportListFilter } from "../Util/Filter";
import { reportYearQuestion } from "./reportYearQuestion";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: '20px',
      },
    centering: {
        marginBottom: '-20px',
      },
    headerCell: {
        fontWeight: "bold",
        borderBottom: "solid black",
    },
    leftPadding: {
        marginLeft: "20px",
    },
});

const validationChoices = [
        { id: 'Tervalidasi', name: 'Tervalidasi' },
    { id: 'Belum Tervalidasi', name: 'Belum Tervalidasi' },
    { id: 'Butuh Revisi', name: 'Butuh Revisi' },
    ]


export const ReportyearList = ({ permissions, record, ...props }) => {
    const classes = useStyles();

    const handleFilterPermanent = () => {
        if (permissions === "Operator") {
            const userid = localStorage.getItem("userid");
            return { author: userid };
            // return {}
        }
        if (permissions === 'Kepala Fasyankes') {
            const institution = localStorage.getItem('institution')
            return { institution: institution }
          }
    };

    // const renderValidation = (record) => {
    //     if (record.validated === true) {
    //         return "Tervalidasi";
    //     } else {
    //         return "Belum Tervalidasi";
    //     }
    // };

    return (
        <List
            title="Laporan per Tahun"
            filter={handleFilterPermanent()}
            filters={<ReportListFilter />}
            actions={<ListActions />}
            {...props}
            bulkActionButtons={false}
        >
            <Datagrid
                classes={{ headerCell: classes.headerCell }}
                rowClick={permissions !== "Kepala Fasyankes" ? "show" : "edit"}
            >
                <ReferenceField
                    link={false}
                    label="Penulis"
                    source="author"
                    reference="user"
                    emptyText="test"
                >
                    <TextField source="username" />
                </ReferenceField>
                <ReferenceField
                    link={false}
                    label="Fasyankes"
                    source="institution"
                    reference="institution"
                >
                    <TextField source="name" />
                </ReferenceField>
               \
                <DateField
                    label="Tanggal Laporan"
                    source="year"
                    options={{
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }}
                    locales="id-ID"
                />
                <SelectField
                    source="validated"
                    label="Status Validasi"
                    choices={validationChoices}
                />
                {permissions === "Operator" || permissions === "Admin" ? (
                    <EditButton />
                ) : (
                    <ShowButton />
                )}
                {permissions === "Admin" ? <DeleteButton /> : null}
            </Datagrid>
        </List>
    );
};

export const ReportyearEdit = ({ permissions, ...props }) => (
    <Edit title={<PageTitle action="Editing" />} {...props}>
        <TabbedForm toolbar={<NoDeleteToolbar />}>
            {permissions === "Kepala Fasyankes" && (
                <FormTab label="Validasi">
                    <p>Aktifkan apabila laporan telah sesuai standar</p>
                    <SelectInput source="validated" label="Status Laporan" choices={validationChoices}/>
                </FormTab>
            )}
            {permissions === "Operator" ? (
                <FormTab label="Tanggal">
                    <QuestionAccordion
                        text="ID Penulis Laporan tidak dapat diubah"
                        question="ID Penulis Laporan"
                    />
                    <TextInput source="author" disabled />
                    <QuestionAccordion
                        text="Tanggal Laporan"
                        question="Tanggal Laporan"
                    />
                    <DateInput source="year" label="Tanggal Laporan" validate={required()}/>
                </FormTab>
                
            ) : null}
            {permissions === "Operator" ? (
                <FormTab label="Fasyankes" path="institution">
                    <QuestionAccordion
                        text="ID Fasyankes hanya dapat diubah oleh administrator"
                        question="ID Fasyankes Pelapor"
                    />
                    <TextInput source="institution" disabled />
                </FormTab>
            ) : null}
            {permissions === "Operator" ? (
                <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p fullWidth>1. {reportYearQuestion[0].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[0].question1}`} source="report.question1.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question1?.a?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question1.a.file"
                                {...rest}
                            />
                        ) : null
                    }
                    
                </FormDataConsumer>           
                <TextField
              source='report.question1.a.comment'
              label='Komentar'
            />
                <SwitchWithSign label={`b. ${reportYearQuestion[0].question2}`} source="report.question1.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question1?.b?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question1.b.file"
                                {...rest}
                            />
                        ) : null
                    }
                </FormDataConsumer>
             <TextField
              source='report.question1.b.comment'
              label='Komentar'
            />
            
                <SwitchWithSign label={`c. ${reportYearQuestion[0].question3}`} source="report.question1.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question1?.c?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question1.c.file"
                                {...rest}
                            />
                        ) : null
                    }
                </FormDataConsumer>
                            <TextField
                         source='report.question1.c.comment'
                         label='Komentar'
                       />

                {/* Question 2 */}
                <p fullWidth>2. {reportYearQuestion[1].prompt}</p>
               
                <SwitchWithSign label={`a. ${reportYearQuestion[1].question1}`} source="report.question2.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question2?.a?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question2.a.file"
                                {...rest}
                            />
                        ) : null
                    }
                </FormDataConsumer>
                 <TextField
              source='report.question2.a.comment'
              label='Komentar'
            />

                <SwitchWithSign label={`b. ${reportYearQuestion[1].question2}`} source="report.question2.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question2?.b?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question2.b.file"
                                {...rest}
                            />
                        ) : null
                    }
                </FormDataConsumer>
                 <TextField
              source='report.question2.b.comment'
              label='Komentar'
            />


                <SwitchWithSign label={`c. ${reportYearQuestion[1].question3}`} source="report.question2.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question2?.c?.information ? (
                            <FileUpload
                                sizeLimit="500000"
                                source="report.question2.c.file"
                                {...rest}
                            />
                        ) : null
                    }
                </FormDataConsumer>
                 <TextField
              source='report.question2.c.comment'
              label='Komentar'
            />

                {/* Question 3 */}
                <p fullWidth>3. {reportYearQuestion[2].prompt} </p>
               
                <SwitchWithSign label={`a. ${reportYearQuestion[2].question1}`} source="report.question3.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question3?.a?.information && (
                            <FileUpload
                                source="report.question3.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question3.a.comment'
              label='Komentar'
            />
                <SwitchWithSign label={`b. ${reportYearQuestion[2].question2}`} source="report.question3.b.information"/>
                
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question3?.b?.information && (
                            <FileUpload
                                source="report.question3.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                 <TextField
              source='report.question3.b.comment'
              label='Komentar'
            />

                
                <SwitchWithSign label={`c. ${reportYearQuestion[2].question3}`} source="report.question3.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question3?.c?.information && (
                            <FileUpload
                                source="report.question3.c.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question3.c.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`d. ${reportYearQuestion[2].question4}`} source="report.question3.d.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question4?.d?.information && (
                            <FileUpload
                                source="report.question4.d.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question3.d.comment'
              label='Komentar'
            />
                {/* Question 4 */}
                <p fullWidth>4. {reportYearQuestion[3].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[3].question1}`} source="report.question4.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question4?.a?.information && (
                            <FileUpload
                                source="report.question4.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question4.a.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`b. ${reportYearQuestion[3].question2}`} source="report.question4.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question4?.b?.information && (
                            <FileUpload
                                source="report.question4.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question4.b.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`c. ${reportYearQuestion[3].question3}`} source="report.question4.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question4?.c?.information && (
                            <FileUpload
                                source="report.question4.c.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question4.c.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`d. ${reportYearQuestion[3].question4}`} source="report.question4.d.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question4?.c?.information && (
                            <FileUpload
                                source="report.question4.d.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question4.d.comment'
              label='Komentar'
            />
                {/* Question 5 */}
                <p fullWidth>5. {reportYearQuestion[4].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[4].question1}`} source="report.question5.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question5?.a?.information && (
                            <FileUpload
                                source="report.question5.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question5.a.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`b. ${reportYearQuestion[4].question2}`} source="report.question5.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question5?.b?.information && (
                            <FileUpload
                                source="report.question5.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question5.b.comment'
              label='Komentar'
            />
                {/* Question 6 */}
                <p fullWidth>6. {reportYearQuestion[5].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[5].question1}`} source="report.question6.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question6?.a?.information && (
                            <FileUpload
                                source="report.question6.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question6.a.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`b. ${reportYearQuestion[5].question2}`} source="report.question6.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question6?.b?.information && (
                            <FileUpload
                                source="report.question6.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question6.b.comment'
              label='Komentar'
            />
                {/* Question 7 */}
                <p fullWidth>7. {reportYearQuestion[6].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[6].question1}`} source="report.question7.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question7?.a?.information && (
                            <FileUpload
                                source="report.question7.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question7.a.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`b. ${reportYearQuestion[6].question2}`} source="report.question7.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question7?.b?.information && (
                            <FileUpload
                                source="report.question7.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question7.b.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`c. ${reportYearQuestion[6].question3}`} source="report.question7.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question7?.c?.information && (
                            <FileUpload
                                source="report.question7.c.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question7.c.comment'
              label='Komentar'
            />
                {/* Qustion 8 */}
                <p fullWidth>8. {reportYearQuestion[7].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[7].question1}`} source="report.question8.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question8?.a?.information && (
                            <FileUpload
                                source="report.question8.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question8.a.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`b. ${reportYearQuestion[7].question2}`} source="report.question8.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question8?.b?.information && (
                            <FileUpload
                                source="report.question8.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question8.b.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`c. ${reportYearQuestion[7].question3}`} source="report.question8.c.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question8?.c?.information && (
                            <FileUpload
                                source="report.question8.c.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question8.c.comment'
              label='Komentar'
            />
                
                <SwitchWithSign label={`d. ${reportYearQuestion[7].question4}`} source="report.question8.d.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question8?.d?.information && (
                            <FileUpload
                                source="report.question8.d.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question8.d.comment'
              label='Komentar'
            />
                {/* Question 9 */}
                <p fullWidth>9. {reportYearQuestion[8].prompt}</p>
               
                <SwitchWithSign label={`a. ${reportYearQuestion[8].question1}`} source="report.question9.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question9?.information && (
                            <FileUpload
                                source="report.question9.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question9.comment'
              label='Komentar'
            />
                {/* Question 10 */}
                <p fullWidth>10. {reportYearQuestion[9].prompt}</p>
                
                <SwitchWithSign label={`a ${reportYearQuestion[9].question1}`} source="report.question10.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question10?.a?.information && (
                            <FileUpload
                                source="report.question10.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question10.a.comment'
              label='Komentar'
            />
                <p fullWidth>b. {reportYearQuestion[9].prompt2}</p>
                <p fullWidth>- {reportYearQuestion[9].prompt3}</p>

                
            

                <TextInput
                    source="report.question10.b.a.information"
                    label={`- ${reportYearQuestion[9].question2}`}
                />
            {/* <FormDataConsumer >
             {({ formData, ...rest }) => formData?.report?.question10?.b?.a?.information  &&
                <FileUpload source="report.question10.b.a.file" {...rest}/>
             }
            </FormDataConsumer> */}
                <TextInput
                    source="report.question10.b.b.information"
                    label={`- ${reportYearQuestion[9].question3}`}
                />
                <TextInput
                    source="report.question10.b.c.information"
                    label={`- ${reportYearQuestion[9].question4}`}
                />
                <TextInput
                    source="report.question10.b.d.information"
                    label={`- ${reportYearQuestion[9].question5}`}
                />

                
                <SwitchWithSign label={`- ${reportYearQuestion[9].question6}`} source="report.question10.b.e.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question10?.b?.e?.information && (
                            <FileUpload
                                source="report.question10.b.e.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question10.b.e.comment'
              label='Komentar'
            />
                <p fullWidth>c. {reportYearQuestion[9].prompt4}</p>
                
                <SwitchWithSign label={`- ${reportYearQuestion[9].question7}`} source="report.question10.c.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question10?.c?.a?.information && (
                            <FileUpload
                                source="report.question10.c.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                
                 <TextField
              source='report.question10.c.a.comment'
              label='Komentar'
            />
                <SwitchWithSign label={`- ${reportYearQuestion[9].question8}`} source="report.question10.c.b.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question10?.c?.b?.information && (
                            <FileUpload
                                source="report.question10.c.b.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                 <TextField
              source='report.question10.c.b.comment'
              label='Komentar'
            />
                {/* Question 11 */}
                <p fullWidth>11. {reportYearQuestion[10].prompt}</p>
                
                <SwitchWithSign label={`a. ${reportYearQuestion[10].question1}`} source="report.question11.a.information"/>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData?.report?.question11?.a?.information && (
                            <FileUpload
                                source="report.question11.a.file"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>

                <TextField
             source='report.question11.a.comment'
             label='Komentar'
           />
                <TextInput
                    source="report.question11.b.information"
                    label={`b. ${reportYearQuestion[10].question2}`}
                />
                </FormTab>
            ) : null}
            {permissions === "Kepala Fasyankes" ? (
                <FormTab label="Laporan" path="report">
                {/* Question 1*/}
                <p fullWidth>1. {reportYearQuestion[0].prompt}</p>
                
                

            <BooleanField label={`a. ${reportYearQuestion[0].question1}`} source="report.question1.a.information"/>
                 <FileField
                source="report.question1.a.file.src"
                title="report.question1.a.file.title"
                label="File terlampir"
            />
                 <TextInput
              source='report.question1.a.comment'
              label='Komentar'
            />

            <BooleanField label={`b. ${reportYearQuestion[0].question2}`} source="report.question1.b.information"/>
                 <FileField
                source="report.question1.b.file.src"
                title="report.question1.b.file.title"
                label="File terlampir"
            /> 
                 <TextInput
              source='report.question1.b.comment'
              label='Komentar'
            />

            
             
                <BooleanField label={`c. ${reportYearQuestion[0].question3}`} source="report.question1.c.information"/>
                 <FileField
                source="report.question1.c.file.src"
                title="report.question1.c.file.title"
                label="File terlampir"
            />
                 <TextInput
              source='report.question1.c.comment'
              label='Komentar'
            />

            

                {/* Question 2 */}
                <p fullWidth>2. {reportYearQuestion[1].prompt}</p>
               
                <BooleanField label={`a. ${reportYearQuestion[1].question1}`} source="report.question2.a.information"/>
                 <FileField
                source="report.question2.a.file.src"
                title="report.question2.a.file.title"
                label="File terlampir"
            />
                 <TextInput
              source='report.question2.a.comment'
              label='Komentar'
            />

            

                <BooleanField label={`b. ${reportYearQuestion[1].question2}`} source="report.question2.b.information"/>
                 <FileField
                source="report.question2.b.file.src"
                title="report.question2.b.file.title"
                label="File terlampir"
            />
                 <TextInput
              source='report.question2.b.comment'
              label='Komentar'
            />

            


                <BooleanField label={`c. ${reportYearQuestion[1].question3}`} source="report.question2.c.information"/>
                 <FileField
                source="report.question2.c.file.src"
                title="report.question2.c.file.title"
                label="File terlampir"
            />
                 <TextInput
              source='report.question2.c.comment'
              label='Komentar'
            />

            

                {/* Question 3 */}
                <p fullWidth>3. {reportYearQuestion[2].prompt} </p>
               
                <BooleanField label={`a. ${reportYearQuestion[2].question1}`} source="report.question3.a.information"/>
                 <FileField
                                source="report.question3.a.file.src"
                                title="report.question3.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question3.a.comment'
              label='Komentar'
            />

                            

                <BooleanField label={`b. ${reportYearQuestion[2].question2}`} source="report.question3.b.information"/>
              <FileField
                                source="report.question3.b.file.src"
                                title="report.question3.b.file.title"
                                label="File terlampir"
                                />
                                <TextInput
              source='report.question3.b.comment'
              label='Komentar'
            />
                

                            

                
                <BooleanField label={`c. ${reportYearQuestion[2].question3}`} source="report.question3.c.information"/>
                 <FileField
                                source="report.question3.c.file.src"
                                title="report.question3.c.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question3.c.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`d. ${reportYearQuestion[2].question4}`} source="report.question3.d.information"/>
                 <FileField
                                source="report.question4.d.file.src"
                                title="report.question4.d.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question3.d.comment'
              label='Komentar'
            />

                            

                {/* Question 4 */}
                <p fullWidth>4. {reportYearQuestion[3].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[3].question1}`} source="report.question4.a.information"/>
                 <FileField
                                source="report.question4.a.file.src"
                                title="report.question4.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question4.a.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`b. ${reportYearQuestion[3].question2}`} source="report.question4.b.information"/>
                 <FileField
                                source="report.question4.b.file.src"
                                title="report.question4.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question4.b.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`c. ${reportYearQuestion[3].question3}`} source="report.question4.c.information"/>
                 <FileField
                                source="report.question4.c.file.src"
                                title="report.question4.c.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question4.c.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`d. ${reportYearQuestion[3].question4}`} source="report.question4.d.information"/>
                 <FileField
                                source="report.question4.d.file.src"
                                title="report.question4.d.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question4.d.comment'
              label='Komentar'
            />

                            

                {/* Question 5 */}
                <p fullWidth>5. {reportYearQuestion[4].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[4].question1}`} source="report.question5.a.information"/>
                 <FileField
                                source="report.question5.a.file.src"
                                title="report.question5.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question5.a.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`b. ${reportYearQuestion[4].question2}`} source="report.question5.b.information"/>
                 <FileField
                                source="report.question5.b.file.src"
                                title="report.question5.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question5.b.comment'
              label='Komentar'
            />

                            

                {/* Question 6 */}
                <p fullWidth>6. {reportYearQuestion[5].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[5].question1}`} source="report.question6.a.information"/>
                 <FileField
                                source="report.question6.a.file.src"
                                title="report.question6.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question6.a.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`b. ${reportYearQuestion[5].question2}`} source="report.question6.b.information"/>
                 <FileField
                                source="report.question6.b.file.src"
                                title="report.question6.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question6.b.comment'
              label='Komentar'
            />

                            

                {/* Question 7 */}
                <p fullWidth>7. {reportYearQuestion[6].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[6].question1}`} source="report.question7.a.information"/>
                 <FileField
                                source="report.question7.a.file.src"
                                title="report.question7.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question7.a.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`b. ${reportYearQuestion[6].question2}`} source="report.question7.b.information"/>
                 <FileField
                                source="report.question7.b.file.src"
                                title="report.question7.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question7.b.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`c. ${reportYearQuestion[6].question3}`} source="report.question7.c.information"/>
                 <FileField
                                source="report.question7.c.file.src"
                                title="report.question7.c.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question7.c.comment'
              label='Komentar'
            />

                            

                {/* Qustion 8 */}
                <p fullWidth>8. {reportYearQuestion[7].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[7].question1}`} source="report.question8.a.information"/>
                 <FileField
                                source="report.question8.a.file.src"
                                title="report.question8.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question8.a.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`b. ${reportYearQuestion[7].question2}`} source="report.question8.b.information"/>
                 <FileField
                                source="report.question8.b.file.src"
                                title="report.question8.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question8.b.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`c. ${reportYearQuestion[7].question3}`} source="report.question8.c.information"/>
                 <FileField
                                source="report.question8.c.file.src"
                                title="report.question8.c.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question8.c.comment'
              label='Komentar'
            />

                            

                
                <BooleanField label={`d. ${reportYearQuestion[7].question4}`} source="report.question8.d.information"/>
                 <FileField
                                source="report.question8.d.file.src"
                                title="report.question8.d.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question8.d.comment'
              label='Komentar'
            />

                            

                {/* Question 9 */}
                <p fullWidth>9. {reportYearQuestion[8].prompt}</p>
               
                <BooleanField label={`a. ${reportYearQuestion[8].question1}`} source="report.question9.information"/>
                 <FileField
                                source="report.question9.file.src"
                                title="report.question9.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question9.comment'
              label='Komentar'
            />

                            

                {/* Question 10 */}
                <p fullWidth>10. {reportYearQuestion[9].prompt}</p>
                
                <BooleanField label={`a ${reportYearQuestion[9].question1}`} source="report.question10.a.information"/>
                 <FileField
                                source="report.question10.a.file.src"
                                title="report.question10.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question10.a.comment'
              label='Komentar'
            />

                            

                <p fullWidth>b. {reportYearQuestion[9].prompt2}</p>
                <p fullWidth>- {reportYearQuestion[9].prompt3}</p>

                
            
<FileField source="report.question10.b.a.file.src" 
            label="File terlampir"
            title="File terlampir.title"
            />

                <TextInput
                    source="report.question10.b.a.information"
                    label={`- ${reportYearQuestion[9].question2}`}
                    />
                    <TextInput
                    source="report.question10.b.b.information"
                    label={`- ${reportYearQuestion[9].question3}`}
                />
                <TextInput
                    source="report.question10.b.c.information"
                    label={`- ${reportYearQuestion[9].question4}`}
                />
                <TextInput
                    source="report.question10.b.d.information"
                    label={`- ${reportYearQuestion[9].question5}`}
                />

                
                <BooleanField label={`- ${reportYearQuestion[9].question6}`} source="report.question10.b.e.information"/>
                 <FileField
                                source="report.question10.b.e.file.src"
                                title="report.question10.b.e.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question10.b.e.comment'
              label='Komentar'
            />

                            

                <p fullWidth>c. {reportYearQuestion[9].prompt4}</p>
                
                <BooleanField label={`- ${reportYearQuestion[9].question7}`} source="report.question10.c.a.information"/>
                 <FileField
                                source="report.question10.c.a.file.src"
                                title="report.question10.c.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question10.c.a.comment'
              label='Komentar'
            />

                            
                
                <BooleanField label={`- ${reportYearQuestion[9].question8}`} source="report.question10.c.b.information"/>
                 <FileField
                                source="report.question10.c.b.file.src"
                                title="report.question10.c.b.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question10.c.b.comment'
              label='Komentar'
            />

                            

                {/* Question 11 */}
                <p fullWidth>11. {reportYearQuestion[10].prompt}</p>
                
                <BooleanField label={`a. ${reportYearQuestion[10].question1}`} source="report.question11.a.information"/>
                 <FileField
                                source="report.question11.a.file.src"
                                title="report.question11.a.file.title"
                                label="File terlampir"
                            />
                 <TextInput
              source='report.question11.a.comment'
              label='Komentar'
            />

                            

                <TextInput
                    source="report.question11.b.information"
                    label={`b. ${reportYearQuestion[10].question2}`}
                />
                </FormTab>
            ) : null}
        </TabbedForm>
    </Edit>
);

export const ReportyearShow = (props) => (
    <Show
        title={<PageTitle action="Show" />}
        actions={<ExportButtonShow />}
        {...props}
    >
        <TabbedShowLayout>
            <Tab label="Penulis">
                <ReferenceField
                    link={false}
                    label="Penulis"
                    source="author"
                    reference="user"
                >
                    <TextField source="username" />
                </ReferenceField>
                <DateField
                    label="Tanggal Laporan"
                    source="year"
                    options={{
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }}
                    locales="id-ID"
                />
            </Tab>
            <Tab label="Fasyankes" path="institution">
                <ReferenceField
                    link={false}
                    label="Fasyankes"
                    source="institution"
                    reference="institution"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label="Laporan" path="report">
                {/* Question 1*/}
                <p>1. SMK3 di Fasyankes</p>
                <BooleanField
                    source="report.question1.a.information"
                    label={`a. ${reportYearQuestion[0].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question1.a.file.src"
                    title="report.question1.a.file.title"
                />
                <BooleanField
                    source="report.question1.b.information"
                    label={`b. ${reportYearQuestion[0].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question1.b.file.src"
                    title="report.question1.b.file.title"
                />
                <BooleanField
                    source="report.question1.c.information"
                    label={`c. ${reportYearQuestion[0].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question1.c.file.src"
                    title="report.question1.c.file.title"
                />

                {/* Question 2 */}
                <p>2. Pengenalan Potensi Bahaya dan Pengendalian Resiko</p>
                <BooleanField
                    source="report.question2.a.information"
                    label={`a. ${reportYearQuestion[1].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question2.a.file.src"
                    title="report.question2.a.file.title"
                />
                <BooleanField
                    source="report.question2.b.information"
                    label={`b. ${reportYearQuestion[1].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question2.b.file.src"
                    title="report.question2.b.file.title"
                />
                <BooleanField
                    source="report.question2.c.information"
                    label={`c. ${reportYearQuestion[1].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question2.c.file.src"
                    title="report.question2.c.file.title"
                />

                {/* Question 3 */}
                <p>3. Penerapan Kewaspadaan Standar </p>
                <BooleanField
                    source="report.question3.a.information"
                    label={`a. ${reportYearQuestion[2].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question3.a.file.src"
                    title="report.question3.a.file.title"
                />
                <BooleanField
                    source="report.question3.b.information"
                    label={`b. ${reportYearQuestion[2].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question3.b.file.src"
                    title="report.question3.b.file.title"
                />
                <BooleanField
                    source="report.question3.c.information"
                    label={`c. ${reportYearQuestion[2].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question3.c.file.src"
                    title="report.question3.c.file.title"
                />
                <BooleanField
                    source="report.question3.d.information"
                    label={`d. ${reportYearQuestion[2].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question3.d.file.src"
                    title="report.question3.d.file.title"
                />

                {/* Question 4 */}
                <p>4. Penerapan Prinsip Ergonomi Pada </p>
                <BooleanField
                    source="report.question4.a.information"
                    label={`a. ${reportYearQuestion[3].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question4.a.file.src"
                    title="report.question4.a.file.title"
                />
                <BooleanField
                    source="report.question4.b.information"
                    label={`b. ${reportYearQuestion[3].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question4.b.file.src"
                    title="report.question4.b.file.title"
                />
                <BooleanField
                    source="report.question4.c.information"
                    label={`c. ${reportYearQuestion[3].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question4.c.file.src"
                    title="report.question4.c.file.title"
                />

                {/* Question 5 */}
                <p>5. Pelayanan Kesehatan Kerja dan Imunisasi</p>
                <BooleanField
                    source="report.question5.a.information"
                    label={`a. ${reportYearQuestion[4].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question5.a.file.src"
                    title="report.question5.a.file.title"
                />
                <BooleanField
                    source="report.question5.b.information"
                    label={`b. ${reportYearQuestion[4].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question5.b.file.src"
                    title="report.question5.b.file.title"
                />

                {/* Question 6 */}
                <p>6. Pembudayaan PHBS di Fasyankes</p>
                <BooleanField
                    source="report.question6.a.information"
                    label={`a. ${reportYearQuestion[5].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question6.a.file.src"
                    title="report.question6.a.file.title"
                />
                <BooleanField
                    source="report.question6.b.information"
                    label={`b. ${reportYearQuestion[5].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question6.b.file.src"
                    title="report.question6.b.file.title"
                />

                {/* Question 7 */}
                <p>
                    7. Aspek Keselamatan dan Kesehatan Kerja pada Pengelolaan
                    Bahan Beracun dan Berbahaya (B3) dan Limbah Domestik
                </p>
                <BooleanField
                    source="report.question7.a.information"
                    label={`a. ${reportYearQuestion[6].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question7.a.file.src"
                    title="report.question7.a.file.title"
                />
                <BooleanField
                    source="report.question7.b.information"
                    label={`b. ${reportYearQuestion[6].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question7.b.file.src"
                    title="report.question7.b.file.title"
                />
                <BooleanField
                    source="report.question7.c.information"
                    label={`c. ${reportYearQuestion[6].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question7.c.file.src"
                    title="report.question7.c.file.title"
                />

                {/* Qustion 8 */}
                <p>8. Pengelolaan Sarana dan Prasarana dari Aspek K3</p>
                <BooleanField
                    source="report.question8.a.information"
                    label={`a. ${reportYearQuestion[7].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question8.a.file.src"
                    title="report.question8.a.file.title"
                />
                <BooleanField
                    source="report.question8.b.information"
                    label={`b. ${reportYearQuestion[7].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question8.b.file.src"
                    title="report.question8.b.file.title"
                />
                <BooleanField
                    source="report.question8.c.information"
                    label={`c. ${reportYearQuestion[7].question3}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question8.c.file.src"
                    title="report.question8.c.file.title"
                />
                <BooleanField
                    source="report.question8.d.information"
                    label={`d. ${reportYearQuestion[7].question4}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question8.d.file.src"
                    title="report.question8.d.file.title"
                />

                {/* Question 9 */}
                <p>9. Pengelolaan Peralatan Medis Dari Aspek K3</p>
                <BooleanField
                    source="report.question9.information"
                    label={`a. ${reportYearQuestion[8].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question9.file.src"
                    title="report.question9.file.title"
                />

                {/* Question 10 */}
                <p>10. {reportYearQuestion[9].prompt}</p>
                <BooleanField
                    source="report.question10.a.information"
                    label={`a. ${reportYearQuestion[9].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question10.a.file.src"
                    title="report.question10.a.file.title"
                />
                <p>{reportYearQuestion[9].prompt2}</p>
                <p>{reportYearQuestion[9].prompt3}</p>
                <BooleanField
                    source="report.question10.b.a.information"
                    label={`-. ${reportYearQuestion[9].question2}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question10.b.a.file.src"
                    title="report.question10.b.a.file.title"
                />
                <TextField
                    source="report.question10.b.b.information"
                    label={`- ${reportYearQuestion[9].question3}`}
                />
                <TextField
                    source="report.question10.b.c.information"
                    label={`- ${reportYearQuestion[9].question4}`}
                />
                <TextField
                    source="report.question10.b.d.information"
                    label={`- ${reportYearQuestion[9].question5}`}
                />
                <p>c. {reportYearQuestion[9].prompt4}</p>
                <BooleanField
                    source="report.question10.c.a.information"
                    label={`-  ${reportYearQuestion[9].question7}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question10.c.a.file.src"
                    title="report.question10.c.a.file.title"
                />
                <BooleanField
                    source="report.question10.c.b.information"
                    label={`-  ${reportYearQuestion[9].question8}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question10.c.a.file.src"
                    title="report.question10.c.a.file.title"
                />

                

                {/* Question 11 */}
                <p>11. Pelatihan</p>
                <BooleanField
                    source="report.question11.a.information"
                    label={`a. ${reportYearQuestion[10].question1}`}
                />
                <FileField
                    label="File terlampir"
                    source="report.question11.a.file.src"
                    title="report.question11.a.file.title"
                />

                <TextField
                    source="report.question11.b.information"
                    label="b. Jumlah SDM Fasyankes yang terlatih K3"
                />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ReportyearCreate = (props) => {
    const userId = localStorage.getItem("userid");
    const isntitutionid = localStorage.getItem("institution");
    return (
        <Create title={<PageTitle action="Creating" />} {...props}>
            <TabbedForm redirect="show" >
                <FormTab label="Tanggal">
                    <QuestionAccordion
                        text="ID Penulis Laporan tidak dapat diubah"
                        question="ID Penulis Laporan"
                    />
                    <TextInput source="author" initialValue={userId} disabled />
                    <QuestionAccordion
                        text="Tanggal Laporan"
                        question="Tanggal Laporan"
                    />
                    <DateInput source="year" label="Tanggal Laporan" validate={required()}/>
                </FormTab>
                <FormTab label="Fasyankes" path="institution">
                    <QuestionAccordion
                        text="ID Fasyankes hanya dapat diubah oleh administrator"
                        question="ID Fasyankes Pelapor"
                    />
                    <TextInput
                        source="institution"
                        initialValue={isntitutionid}
                        disabled
                    />
                </FormTab>
                <FormTab label="Laporan" path="report">
                    {/* Question 1*/}
                    <p fullWidth>1. {reportYearQuestion[0].prompt}</p>
                    
                    <SwitchWithSign label={`a. ${reportYearQuestion[0].question1}`} source="report.question1.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question1?.a?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question1.a.file"
                                    {...rest}
                                />
                            ) : null
                        }
                        
                    </FormDataConsumer>           
                    <SwitchWithSign label={`b. ${reportYearQuestion[0].question2}`} source="report.question1.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question1?.b?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question1.b.file"
                                    {...rest}
                                />
                            ) : null
                        }
                    </FormDataConsumer>
                 
                    <SwitchWithSign label={`c. ${reportYearQuestion[0].question3}`} source="report.question1.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question1?.c?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question1.c.file"
                                    {...rest}
                                />
                            ) : null
                        }
                    </FormDataConsumer>

                    {/* Question 2 */}
                    <p fullWidth>2. {reportYearQuestion[1].prompt}</p>
                        {/* <BooleanInput
                        fullWidth
                        source="report.question2.a.information"
                        label={`a. ${reportYearQuestion[1].question1}`}
                    /> */}
                    <SwitchWithSign label={`a. ${reportYearQuestion[1].question1}`} source="report.question2.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question2?.a?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question2.a.file"
                                    {...rest}
                                />
                            ) : null
                        }
                    </FormDataConsumer>

                        {/* <BooleanInput
                        fullWidth
                        source="report.question2.b.information"
                        label={`b. ${reportYearQuestion[1].question2}`}
                    /> */}
                    <SwitchWithSign label={`b. ${reportYearQuestion[1].question2}`} source="report.question2.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question2?.b?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question2.b.file"
                                    {...rest}
                                />
                            ) : null
                        }
                    </FormDataConsumer>

                    {/* <SwitchWithSign label={`b. ${reportYearQuestion[0].question2}`} source="report.question1.b.information"/> */}

                    <SwitchWithSign label={`c. ${reportYearQuestion[1].question3}`} source="report.question2.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question2?.c?.information ? (
                                <FileUpload
                                    sizeLimit="500000"
                                    source="report.question2.c.file"
                                    {...rest}
                                />
                            ) : null
                        }
                    </FormDataConsumer>

                    {/* Question 3 */}
                    <p fullWidth>3. {reportYearQuestion[2].prompt} </p>
                       
                    <SwitchWithSign label={`a. ${reportYearQuestion[2].question1}`} source="report.question3.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question3?.a?.information && (
                                <FileUpload
                                    source="report.question3.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>


                    <SwitchWithSign label={`b. ${reportYearQuestion[2].question2}`} source="report.question3.b.information"/>
                    
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question3?.b?.information && (
                                <FileUpload
                                    source="report.question3.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`c. ${reportYearQuestion[2].question3}`} source="report.question3.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question3?.c?.information && (
                                <FileUpload
                                    source="report.question3.c.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`d. ${reportYearQuestion[2].question4}`} source="report.question3.d.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question4?.d?.information && (
                                <FileUpload
                                    source="report.question4.d.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 4 */}
                    <p fullWidth>4. {reportYearQuestion[3].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[3].question1}`} source="report.question4.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question4?.a?.information && (
                                <FileUpload
                                    source="report.question4.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`b. ${reportYearQuestion[3].question2}`} source="report.question4.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question4?.b?.information && (
                                <FileUpload
                                    source="report.question4.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`c. ${reportYearQuestion[3].question3}`} source="report.question4.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question4?.c?.information && (
                                <FileUpload
                                    source="report.question4.c.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`d. ${reportYearQuestion[3].question4}`} source="report.question4.d.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question4?.c?.information && (
                                <FileUpload
                                    source="report.question4.d.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 5 */}
                    <p fullWidth>5. {reportYearQuestion[4].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[4].question1}`} source="report.question5.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question5?.a?.information && (
                                <FileUpload
                                    source="report.question5.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`b. ${reportYearQuestion[4].question2}`} source="report.question5.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question5?.b?.information && (
                                <FileUpload
                                    source="report.question5.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 6 */}
                    <p fullWidth>6. {reportYearQuestion[5].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[5].question1}`} source="report.question6.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question6?.a?.information && (
                                <FileUpload
                                    source="report.question6.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`b. ${reportYearQuestion[5].question2}`} source="report.question6.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question6?.b?.information && (
                                <FileUpload
                                    source="report.question6.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 7 */}
                    <p fullWidth>7. {reportYearQuestion[6].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[6].question1}`} source="report.question7.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question7?.a?.information && (
                                <FileUpload
                                    source="report.question7.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`b. ${reportYearQuestion[6].question2}`} source="report.question7.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question7?.b?.information && (
                                <FileUpload
                                    source="report.question7.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`c. ${reportYearQuestion[6].question3}`} source="report.question7.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question7?.c?.information && (
                                <FileUpload
                                    source="report.question7.c.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Qustion 8 */}
                    <p fullWidth>8. {reportYearQuestion[7].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[7].question1}`} source="report.question8.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question8?.a?.information && (
                                <FileUpload
                                    source="report.question8.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`b. ${reportYearQuestion[7].question2}`} source="report.question8.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question8?.b?.information && (
                                <FileUpload
                                    source="report.question8.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`c. ${reportYearQuestion[7].question3}`} source="report.question8.c.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question8?.c?.information && (
                                <FileUpload
                                    source="report.question8.c.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                        
                    <SwitchWithSign label={`d. ${reportYearQuestion[7].question4}`} source="report.question8.d.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question8?.d?.information && (
                                <FileUpload
                                    source="report.question8.d.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 9 */}
                    <p fullWidth>9. {reportYearQuestion[8].prompt}</p>
                   
                       
                    <SwitchWithSign label={`a. ${reportYearQuestion[8].question1}`} source="report.question9.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question9?.information && (
                                <FileUpload
                                    source="report.question9.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 10 */}
                    <p fullWidth>10. {reportYearQuestion[9].prompt}</p>
                        
                    <SwitchWithSign label={`a ${reportYearQuestion[9].question1}`} source="report.question10.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question10?.a?.information && (
                                <FileUpload
                                    source="report.question10.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    <p fullWidth>b. {reportYearQuestion[9].prompt2}</p>
                    <p fullWidth>- {reportYearQuestion[9].prompt3}</p>

                        
                {/* <SwitchWithSign label={`a. ${reporpload source="report.question10.b.a.file" {...rest}/a, ...rest }) => formData?.report?.question10?.b?.a?.information  &&/> */}

                    <TextInput
                        source="report.question10.b.a.information"
                        label={`- ${reportYearQuestion[9].question2}`}
                    />
                {/* <FormDataConsumer >
                 {({ formData, ...rest }) => formData?.report?.question10?.b?.a?.information  &&
                    <FileUpload source="report.question10.b.a.file" {...rest}/>
                 }
                </FormDataConsumer> */}
                    <TextInput
                        source="report.question10.b.b.information"
                        label={`- ${reportYearQuestion[9].question3}`}
                    />
                    <TextInput
                        source="report.question10.b.c.information"
                        label={`- ${reportYearQuestion[9].question4}`}
                    />
                    <TextInput
                        source="report.question10.b.d.information"
                        label={`- ${reportYearQuestion[9].question5}`}
                    />

                        
                    <SwitchWithSign label={`- ${reportYearQuestion[9].question6}`} source="report.question10.b.e.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question10?.b?.e?.information && (
                                <FileUpload
                                    source="report.question10.b.e.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    <p fullWidth>c. {reportYearQuestion[9].prompt4}</p>
                        
                    <SwitchWithSign label={`- ${reportYearQuestion[9].question7}`} source="report.question10.c.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question10?.c?.a?.information && (
                                <FileUpload
                                    source="report.question10.c.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>
                        
                    <SwitchWithSign label={`- ${reportYearQuestion[9].question8}`} source="report.question10.c.b.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question10?.c?.b?.information && (
                                <FileUpload
                                    source="report.question10.c.b.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    {/* Question 11 */}
                    <p fullWidth>11. {reportYearQuestion[10].prompt}</p>
                        
                    <SwitchWithSign label={`a. ${reportYearQuestion[10].question1}`} source="report.question11.a.information"/>
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData?.report?.question11?.a?.information && (
                                <FileUpload
                                    source="report.question11.a.file"
                                    {...rest}
                                />
                            )
                        }
                    </FormDataConsumer>

                    <TextInput
                        source="report.question11.b.information"
                        label={`b. ${reportYearQuestion[10].question2}`}
                    />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};
