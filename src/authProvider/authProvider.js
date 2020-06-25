const authProvider = {
    login: async ({username, password}) => {
            await fetch('http://192.168.100.62:9000/auth/login',{
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(async (res) => {
                if (res.status < 200 || res.status >= 300){
                    throw new Error(res.statusText);
                }
                const user = await res.json();
                return user;
            })
            .then((json) => {
                // console.log(json)
                localStorage.setItem('username', username);
                // localStorage.setItem('privilege', json.privilege);
                // localStorage.setItem('userid', json._id);

            })
            .catch((err) => {
                console.log("Error")
                console.log(err)
            })
            },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve()

    },
    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
            },
    checkError: () => {
        return Promise.resolve()},
    getPermissions: () => {
        const role = localStorage.getItem('privilege');
        return (role === 'A')? Promise.resolve(role) : Promise.reject() ;
    },
};

export default authProvider;