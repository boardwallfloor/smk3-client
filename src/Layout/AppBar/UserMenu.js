import React, {forwardRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

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