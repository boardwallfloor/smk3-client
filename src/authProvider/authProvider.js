import { fetchUtils } from 'react-admin';
import decodeJwt from 'jwt-decode';

const httpClient = fetchUtils.fetchJson;

const authProvider = {
    login: async ({username, password}) => {
        
            await httpClient(`${process.env.REACT_APP_API_LINK}/auth/login`,{
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then((res) => {
                if (res.status < 200 || res.status >= 300){
                    throw new Error(res.statusText);
                }
                // const user = await res.json();
                // console.log(res.json)
                return res.json;
            })
            .then((json) => {
                const decodedToken = decodeJwt(json);
                localStorage.setItem('jwt', json);
                localStorage.setItem('privilege', decodedToken.privilege);
                localStorage.setItem('username', decodedToken.username);
                localStorage.setItem('userid', decodedToken._id);
                localStorage.setItem('institution', decodedToken.user_institution);
                // console.log('decodedToken')

            })
            },
    logout: () => {
        // console.log('test')
        localStorage.removeItem('jwt');
        localStorage.removeItem('privilege');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('institution');

        return Promise.resolve()

    },
    checkAuth: async() => {
        // await httpClient(`${process.env.REACT_APP_API_LINK}/auth/checkAuth`,{
        //         method: 'POST',
        //         // body: JSON.stringify({ username, password }),
        //         headers: new Headers({
        //          'Content-Type': 'application/json',
        //          'Authorization' : `${localStorage.getItem('jwt')}`
        //      }),
        //     })
        return localStorage.getItem('jwt') ? Promise.resolve() : Promise.reject();
            },
    checkError: () => {
        // console.log('eeror')
        return Promise.resolve()},
    getPermissions: () => {
        const role = localStorage.getItem('privilege');
        return role ? Promise.resolve(role) : Promise.reject() ;
    },
};

export default authProvider;