import React from 'react';
import {FileInput, FileField} from 'react-admin'

const FileUpload = (props) => {
    return(
        <FileInput placeholder='Drag File atau Klik Text untuk Upload' source={props.source}  accept=".doc,.docx,application/pdf,.png" label='Upload File' >
            <FileField source='src' title='title' />
        </FileInput>
        )
}

export default FileUpload;