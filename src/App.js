import * as React from "react";
import { Admin, Resource, EditGuesser, ListGuesser, ShowGuesser } from 'react-admin';

import dataProviderLocal from './dataProvider/dataProvider';
import authProviderLocal from './authProvider/authProvider';
import Dashboard from './Dashboard/Dashboard'
import {InstitutionList, InstitutionShow, InstitutionEdit, InstitutionCreate} from './Institution/Institution';
import {ReportyearList, ReportyearShow, ReportyearEdit} from './ReportYear/ReportYear';
import {UserList, UserEdit, UserCreate, UserShow} from './User/User';

const App = () => (

    <Admin dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard}>
       	<Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow}/>
       	<Resource name="institution" list={InstitutionList} show={InstitutionShow} edit={InstitutionEdit} create={InstitutionCreate} options={{ label: 'Fasyankes' }}/>
       	<Resource name="reportyear" list={ReportyearList} edit={ReportyearEdit} show={ReportyearShow} options={{ label: 'Laporan Per Tahun' }}/>
    </Admin>
);

export default App;
