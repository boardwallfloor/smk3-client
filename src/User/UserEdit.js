import * as React from "react";
import { Edit, SimpleForm, TextInput } from 'react-admin';

import PageTitle from '../Util/PageTitle';

const UserEdit = props => (
    <Edit title={<PageTitle />} {...props}>
        <SimpleForm>
            <TextInput source="privilege" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="phonenumber" />
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);

export default UserEdit;