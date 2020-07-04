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
import Dashboard from './Dashboard/Dashboard'
import {UserList, UserEdit, UserCreate, UserShow} from './User/User';
import {InstitutionList, InstitutionShow, InstitutionEdit, InstitutionCreate} from './Institution/Institution';
import {ReportyearList, ReportyearShow, ReportyearEdit, ReportyearCreate} from './ReportYear/ReportYear';
import {ReportsemesterList, ReportsemesterEdit, ReportsemesterShow, ReportsemesterCreate} from './ReportSemester/ReportSemester'
import {NotifList, NotifEdit, NotifCreate, NotifShow} from './Notification/Notification.js'
import {ProfileShow} from './Profile/Profile.js';
import CustomLayout from './Layout/Layout';

const App = () => (

    <Admin layout={CustomLayout} dataProvider={dataProviderLocal} authProvider={authProviderLocal} dashboard={Dashboard} customRoutes={[
		<Route
			path="/profile"
			component={ProfileShow}
		/>
   ]}>
       	<Resource name="notif" icon={NotificationsActiveIcon} list={NotifList} edit={NotifEdit} create={NotifCreate} show={NotifShow} options={{ label: 'Reminder' }}/>
       	<Resource name="user" icon={GroupIcon} list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} options={{ label: 'User' }}/>
       	<Resource name="institution" icon={LocalHospitalIcon} list={InstitutionList} show={InstitutionShow} edit={InstitutionEdit} create={InstitutionCreate} options={{ label: 'Fasyankes' }}/>
       	<Resource name="reportyear" icon={EventNoteIcon} list={ReportyearList} edit={ReportyearEdit} show={ReportyearShow} create={ReportyearCreate} options={{ label: 'Laporan Per Tahun' }}/>
       	<Resource name="reportsemester" icon={DateRangeIcon } list={ReportsemesterList} edit={ReportsemesterEdit} show={ReportsemesterShow} create={ReportsemesterCreate} options={{ label: 'Laporan Per Semester' }}/>
       	<Resource name='profile' />
    </Admin>
);

export default App;
