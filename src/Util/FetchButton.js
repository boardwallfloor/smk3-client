import * as React from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const Fetch = async (props) => {
    const getId = localStorage.getItem('userid');
    // await fetch('http://192.168.100.62:9000/notification')
    return console.log(props._id, getId);
}


const FetchButton = (props) => (    
    <Tooltip title={props.tooltip}>
        <IconButton onClick={() => Fetch(props.record)} >
            {props.icon}
        </IconButton>
    </Tooltip>
)

export default FetchButton;