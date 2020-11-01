import React from "react";
import { Layout } from 'react-admin';

import {CustomSidebar} from './SideBar/SideBar'
import {CustomAppBar} from './AppBar/AppBar';

const MyLayout = props => {
	return (
	<Layout
    	{...props}
    	appBar={CustomAppBar}
    	sidebar={CustomSidebar}
    	// theme={k3theme}
    // menu={MyMenu}
    // notification={MyNotification}
	/>
)
}

export default MyLayout;