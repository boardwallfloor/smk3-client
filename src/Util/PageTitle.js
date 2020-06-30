import * as React from 'react';
import moment from 'moment';

const PageTitle = (props) => {
    // console.log(props)
    if(props.record.name){
    	return <span>{props.action} {props.record.name ? `${props.record.name}` : ''}</span>;
	} else if(props.record.remindee){
		return <span>{props.action} reminder at {moment(props.record.remind_date).format("dddd, MMMM Do YYYY")}</span>;
	} else{
		return <span>{props.action} </span>
	}
}

export default PageTitle;