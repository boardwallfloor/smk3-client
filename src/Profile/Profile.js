import React from 'react';
import { Show, SimpleShowLayout, EmailField, TextField} from 'react-admin'

import PageTitle from '../Util/PageTitle';

export const ProfileShow = ({ staticContext, ...props }) => {
	console.log(props)
	const userId = localStorage.getItem('userid')
	return (
    <Show title={<PageTitle action="Show"/>} id={userId} resource="profile" basePath="/profile" {...props}>
        <SimpleShowLayout>
            <TextField source="privilege" />
            <TextField source="nip" />
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="full_name" />
            <EmailField source="email" />
            <TextField source="phonenumber" />
        </SimpleShowLayout>
    </Show>
);
}

