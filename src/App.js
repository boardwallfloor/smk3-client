import * as React from "react";
import { Admin, Resource } from 'react-admin';
import dataProviderLocal from './dataProvider/dataProvider';

import UserList from './User/UserList.js';
import UserEdit from './User/UserEdit.js';
import FormList from './Form/FormList.js';
import FormCreate from './Form/FormCreate';
import FormEdit from './Form/FormEdit';



const App = () => (

    //Remember to provide authProvider for authentication
    <Admin dataProvider={dataProviderLocal} >
       <Resource name="user" list={UserList} edit={UserEdit}/>
       <Resource name="form" list={FormList} create={FormCreate} edit={FormEdit}/>
    </Admin>
);

export default App;