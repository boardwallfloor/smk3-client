import React from 'react';
import {ReferenceField as RaReferenceField} from 'react-admin'

export const ReferenceFieldNoLink = () =>{
	const noLinkReferenceField = Component => ({ ...props }) =>(
		<Component {...props} />
	)

const ReferenceField = noLinkReferenceField(RaReferenceField)

return ReferenceField
}

