import React from "react";
import { Layout } from 'react-admin';
import {CustomSidebar} from './SideBar/SideBar'
import {CustomAppBar} from './AppBar/AppBar';


const MyLayout = props => <Layout
    {...props}
    appBar={CustomAppBar}
    sidebar={CustomSidebar}
    // menu={MyMenu}
    // notification={MyNotification}
/>;

export default MyLayout;