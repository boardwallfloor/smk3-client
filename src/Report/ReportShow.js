import * as React from "react";
import {Show, SimpleShowLayout, ReferenceField, TextField, ArrayField, Datagrid, BooleanField, NumberField} from 'react-admin';

const ReportShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField source="_id" reference="s"><TextField source="id" /></ReferenceField>
            <TextField source="title" />
            <TextField source="desc1" />
            <ArrayField source="formGroup"><Datagrid><TextField source="formid" />
<BooleanField source="status" />
<ReferenceField source="_id" reference="s"><TextField source="id" /></ReferenceField>
<TextField source="userid" /></Datagrid></ArrayField>
            <NumberField source="__v" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);

export default ReportShow;