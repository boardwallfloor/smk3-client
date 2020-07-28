import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(function (theme) { return ({
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    button: {
        width: '100%',
         marginTop: '1em',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}); }, { name: 'RaLoginForm' });


const MyLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        login({ username, password })
            .catch( (err) => {
                setLoading(false)
                const errString = err.toString();
                notify(errString)
                if(errString === "Error: Username is not found" || errString === "Error: Incorrect username"){
                    setErrorUsername(true);
                }
                if(errString === 'Error: Incorrect password'){
                    setErrorPassword(true)
                }

            });
    };
    const classes = useStyles();
    return (
            <form onSubmit={submit} className={classes.form}>
                <TextField variant='filled' fullWidth className={classes.input} name="username" error={errorUsername} helperText={errorUsername ? 'Username is incorrect' : ''} value={username} onChange={e => setUsername(e.target.value)} /> 
                <TextField variant='filled' error={errorPassword} helperText={errorPassword ? 'Password is incorrect' : ''} fullWidth className={classes.input} name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>{loading ? <CircularProgress className={classes.icon} size={18} thickness={2}/> : 'Submit'}</Button>
            </form>
    );
};

export default MyLoginPage;