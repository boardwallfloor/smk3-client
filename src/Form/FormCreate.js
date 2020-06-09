import * as React from "react";
import { Create, SimpleForm, TextInput, ReferenceArrayInput, SelectArrayInput, BooleanInput } from 'react-admin';

import PageTitle from '../Util/PageTitle';

const FormCreate = props => (
    <Create title={<PageTitle />} {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <BooleanInput label="Enum 1" source="enum1" />
            <BooleanInput label="Enum 2" source="enum2" />
            <ReferenceArrayInput source="user" reference="user" label="User">
                <SelectArrayInput optionText="username" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export default FormCreate;