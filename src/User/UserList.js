import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="privilege" />
            <EmailField source="email" />
            <TextField source="phonenumber" />
        </Datagrid>
    </List>
);

export default UserList;