import React from 'react';
import { Filter, ReferenceInput } from 'react-admin';
import {
  SelectInput as RaSelectInput,
} from 'react-admin'


const outlinedVariant = Component => (props) => <Component {...props} variant="outlined" size="small" />

const SelectInput = outlinedVariant(RaSelectInput)

export const ReportListFilter = (props) => {
    
    return(
        <Filter {...props}>
            {props.permissions !== "Operator" ?
                <div>
                    <ReferenceInput label="User" source="author" reference="user" allowEmpty alwaysOn>
                        <SelectInput optionText="username" />
                    </ReferenceInput>
                    <ReferenceInput label="Fasyankes" source="institution" reference="institution" alwaysOn>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                </div>
                : null}
            <SelectInput source="validated"  label='Status Validasi'  alwaysOn choices={[
                { id: true, name: 'Tervalidasi' },
                { id: false, name: 'Belum Tervalidasi' },

            ]} />
        </Filter>
    )}
export const NotifListFilter = (props) => {
    
    return(
        <Filter {...props}>
            {props.permissions !== "Operator" ?
                <div>
                    <ReferenceInput label="User" source="author" reference="user" allowEmpty alwaysOn>
                        <SelectInput optionText="username" />
                    </ReferenceInput>
                    
                </div>
                : null}
            <SelectInput source="notification_status"  label='Status Laporan'  alwaysOn choices={[
                { id: 'Belum Dikirim', name: 'Belum Dikirim' },
                { id: 'Peringatan Dikirim', name: 'Peringatan Dikirim' },
                { id: 'Laporan Dibuat', name: 'Laporan Dibuat' },

            ]} />
            <SelectInput source="report_type"  label='Tipe Laporan'  alwaysOn choices={[
                { id: 'yearly', name: 'Per Tahun' },
                { id: 'semesterly', name: 'Per Semester' },

            ]} />
        </Filter>
    )}