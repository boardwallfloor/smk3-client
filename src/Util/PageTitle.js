import * as React from 'react';

const PageTitle = (props) => {
    console.log(props)
    return <span>{props.action} {props.record.name ? `${props.record.name}` : ''}</span>;
}

export default PageTitle;