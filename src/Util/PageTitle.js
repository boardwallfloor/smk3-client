import * as React from 'react';

const PageTitle = (props) => {
    return <span>{props.action} {console.log(props)} {props.record.name ? `${props.record.name}` : ''}</span>;
}

export default PageTitle;