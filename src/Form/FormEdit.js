import * as React from "react";
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput} from 'react-admin';

import PageTitle from '../Util/PageTitle';

const FormEdit = props => (
    <Edit title={<PageTitle />} {...props}>
        <SimpleForm>
            <SelectInput source="enum1" choices={[
                { id: 'Value 1', name: 'Value 1' },
                { id: 'Value 2', name: 'Value 2' },
                { id: 'Value 3', name: 'Value 3' },
            ]} />
            <SelectInput source="enum2" choices={[
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
            ]} />
            <ReferenceInput label="User" source="user" reference="user">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <TextInput fullWidth='true' source="title" />
            <TextInput fullWidth='true' source="desc1" />
            <TextInput fullWidth='true' source="desc2" />
        </SimpleForm>
    </Edit>
);

export default FormEdit;