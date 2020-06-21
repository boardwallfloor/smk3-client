import * as React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, SelectInput, ReferenceInput } from 'react-admin';

import PageTitle from '../Util/PageTitle';

const FormCreate = props => (
    <Create title={<PageTitle />} {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <SelectInput label="Option 1" source="enum1" choices={[
                { id: 'Value 1', name: 'Value 1' },
                { id: 'Value 2', name: 'Value 2' },
                { id: 'Value 3', name: 'Value 3' },
                ]}/>
            <SelectInput label="Option 2" source="enum2" choices={[
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
                ]}/>
            <BooleanInput label="Boolean" source="bool" />
            <ReferenceInput source="user" reference="user" label="User">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <TextInput label="Description 1" source="desc1" />
            <TextInput label="Description 2" source="desc2" />
        </SimpleForm>
    </Create>
);

export default FormCreate;