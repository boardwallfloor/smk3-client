import React from "react";
import {Route} from "react-router-dom";
import { Admin, Resource} from 'react-admin';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import dataProviderLocal from './dataProvider/dataProvider';
import authProviderLocal from './authProvider/authProvider';
import {Dashboard} from './Dashboard/Dashboard'
import {UserList, UserEdit, UserCreate, UserShow} from './User/User';
import {InstitutionList, InstitutionShow, InstitutionEdit, InstitutionCreate} from './Institution/Institution';
import {ReportyearList, ReportyearShow, ReportyearEdit, ReportyearCreate} from './ReportYear/ReportYear';
import {ReportsemesterList, ReportsemesterEdit, ReportsemesterShow, ReportsemesterCreate} from './ReportSemester/ReportSemester'
import {NotifList, NotifEdit, NotifCreate, NotifShow} from './Notification/Notification.js'
import {ProfileShow} from './Profile/Profile.js';
import Manual from './Manual/Manual'
import CustomLayout from './Layout/Layout';
import LoginPage from './Layout/Login/Login'

const App = () => (

    <Admin loginPage={LoginPage} layout={CustomLayout} dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard} customRoutes={[
		<Route
			path="/profile"
			component={ProfileShow}
		/>,
    <Route
      path="/manual"
      component={Manual}
    />
   	]}>
   	{permissions => [

        <Resource name="notif" icon={NotificationsActiveIcon} 
        list={NotifList} 
        edit={permissions !== 'Dinas Kesehatan' || permissions === 'Kepala Fasyankes' ? NotifEdit : null} 
        create={permissions !== 'Dinas Kesehatan' || permissions === 'Kepala Fasyankes' ? NotifCreate : null} 
        show={NotifShow} 
        options={{ label:'Reminder' }} />,

       	permissions === 'Admin' ? <Resource name="user" icon={GroupIcon} list={UserList} 
        edit={permissions !== 'Dinas Kesehatan' ? UserEdit : null} 
        create={permissions !== 'Dinas Kesehatan' ? UserCreate : null} 
        show={UserShow} options={{ label: 'User' }}/> : <Resource name="user" />,

       	permissions !== 'Operator' ? <Resource name="institution" icon={LocalHospitalIcon} list={InstitutionList} show={InstitutionShow} 
        edit={permissions !== 'Dinas Kesehatan' ? InstitutionEdit : null} 
        create={permissions !== 'Dinas Kesehatan' ? InstitutionCreate : null} options={{ label: 'Fasyankes' }}/> : <Resource name="institution" />,

       	<Resource name="reportyear" icon={EventNoteIcon} list={ReportyearList} edit={permissions !== 'Dinas Kesehatan' ? ReportyearEdit : null} show={ReportyearShow} create={permissions !== 'Dinas Kesehatan' ? ReportyearCreate : null} options={{ label: 'Laporan Per Tahun' }}/>,

       	<Resource name="reportsemester" icon={DateRangeIcon } list={ReportsemesterList} edit={permissions !== 'Dinas Kesehatan' ? ReportsemesterEdit : null} show={ReportsemesterShow} create={permissions !== 'Dinas Kesehatan' ? ReportsemesterCreate : null} options={{ label: 'Laporan Per Semester' }}/>,
       	<Resource name='profile' />
   		]}
    </Admin>
);

export default App;
