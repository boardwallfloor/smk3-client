import React, {forwardRef} from "react";
import PersonIcon from '@material-ui/icons/Person';
import { UserMenu, MenuItemLink } from 'react-admin';


const ConfigurationMenu = forwardRef(({ onClick }, ref) => (
    <MenuItemLink
        ref={ref}
        to="/profile"
        primaryText="Account"
        leftIcon={<PersonIcon />}
        onClick={onClick} // close the menu on click
    />
));



export const MyUserMenu = props => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);