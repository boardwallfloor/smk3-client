import * as React from "react";
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

const FormList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="enum1" />
            <TextField source="enum2" />
            <ReferenceField label="User" source="user" reference="user">
                <TextField source="username" />
            </ReferenceField>
            <TextField source="title" />
        </Datagrid>
    </List>
);

export default FormList;