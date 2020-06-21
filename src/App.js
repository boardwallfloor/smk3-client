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
import ReportList from './Report/ReportList';
import ReportShow from './Report/ReportShow';



const App = () => (

    <Admin dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard}>
       {privilege => [
       	<Resource name="user" list={UserList} edit={privilege === 'A' ? UserEdit : null}/>,
       	<Resource name="form" list={FormList} create={FormCreate} edit={privilege === 'B' ? FormEdit : null}/>,
       	<Resource name="test" list={ReportList} show={ReportShow}/>
       	]}
    </Admin>
);

export default App;
