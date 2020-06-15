import * as React from "react";
import { Admin, Resource } from 'react-admin';

import dataProviderLocal from './dataProvider/dataProvider';
import authProviderLocal from './authProvider/authProvider';

import Dashboard from './Dashboard/Dashboard'
import UserList from './User/UserList.js';
import UserEdit from './User/UserEdit.js';
import FormList from './Form/FormList.js';
import FormCreate from './Form/FormCreate';
import FormEdit from './Form/FormEdit';



const App = () => (

    //Remember to provide authProvider for authentication
    <Admin dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard}>
       {privilege => [
       	<Resource name="user" list={UserList} edit={privilege === 'A' ? UserEdit : null}/>,
       	<Resource name="form" list={FormList} create={FormCreate} edit={privilege === 'B' ? FormEdit : null}/>
       	]}
    </Admin>
);

export default App;
