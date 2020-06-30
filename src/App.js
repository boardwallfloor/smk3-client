import * as React from "react";
import { Admin, Resource} from 'react-admin';

import dataProviderLocal from './dataProvider/dataProvider';
import authProviderLocal from './authProvider/authProvider';
import Dashboard from './Dashboard/Dashboard'
import {UserList, UserEdit, UserCreate, UserShow} from './User/User';
import {InstitutionList, InstitutionShow, InstitutionEdit, InstitutionCreate} from './Institution/Institution';
import {ReportyearList, ReportyearShow, ReportyearEdit, ReportyearCreate} from './ReportYear/ReportYear';
import {ReportsemesterList, ReportsemesterEdit, ReportsemesterShow, ReportsemesterCreate} from './ReportSemester/ReportSemester'
import {NotifList, NotifEdit, NotifCreate, NotifShow} from './Notification/Notification.js'

const App = () => (

    <Admin dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard}>
       	<Resource name="notif" list={NotifList} edit={NotifEdit} create={NotifCreate} show={NotifShow} options={{ label: 'Reminder' }}/>
       	<Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} options={{ label: 'User' }}/>
       	<Resource name="institution" list={InstitutionList} show={InstitutionShow} edit={InstitutionEdit} create={InstitutionCreate} options={{ label: 'Fasyankes' }}/>
       	<Resource name="reportyear" list={ReportyearList} edit={ReportyearEdit} show={ReportyearShow} create={ReportyearCreate} options={{ label: 'Laporan Per Tahun' }}/>
       	<Resource name="reportsemester" list={ReportsemesterList} edit={ReportsemesterEdit} show={ReportsemesterShow} create={ReportsemesterCreate} options={{ label: 'Laporan Per Semester' }}/>

    </Admin>
);

export default App;
