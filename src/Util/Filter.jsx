import React from 'react';
import { Filter, ReferenceInput, SelectInput } from 'react-admin';

export const ReportSemesterListFilter = (props) => {

    return(
        <Filter {...props}>
            <ReferenceInput label="User" source="author" reference="user" allowEmpty alwaysOn>
                <SelectInput optionText="username" />
            </ReferenceInput>
            <ReferenceInput label="Fasyankes" source="institution" reference="institution" alwaysOn>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <SelectInput source="validated"  label='Status Validasi'  alwaysOn choices={[
                { id: true, name: 'Tervalidasi' },
                { id: false, name: 'Belum Tervalidasi' },
            ]} />
        </Filter>
    )}