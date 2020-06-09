import * as React from 'react';

const PageTitle = (record) => {
    return <span>Editing {record ? `"${record.record.title}"` : ''}</span>;
}

export default PageTitle;