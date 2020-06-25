import React ,{useState,useEffect}from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const Fetch = async (props) => {
    // const getId = localStorage.getItem('userid');
    // await fetch('http://192.168.100.62:9000/notification')
    // console.log(count)
    return console.log(props);
    // return console.log(props._id, getId);
}


const FetchButton = (props) => {

	return (
    <Tooltip title={props.tooltip}>
        <IconButton onClick={() => Fetch(props.total)} >
            {props.icon}
        </IconButton>
    </Tooltip>
)
}

export default FetchButton;