import * as React from "react";
import { List, Datagrid,TextField} from 'react-admin';
import SmsIcon from '@material-ui/icons/Sms';
import EmailIcon from '@material-ui/icons/Email';

import FetchButton from '../Util/FetchButton.js';

const getRowId = (id, basePath, record) => {
    return console.log(id);
    // return alert(id);
}

const ActionIconButton = props => (
    <List {...props}>
        <Datagrid rowClick="expand" >
            <TextField source="title" />
            <TextField source="_id" />
            <TextField source="desc1" />
            <FetchButton icon={<SmsIcon />} tooltip={"Send SMS"} />
            <FetchButton icon={<EmailIcon />} tooltip={"Send Email"}/>
        </Datagrid>
    </List>
);

export default ActionIconButton;