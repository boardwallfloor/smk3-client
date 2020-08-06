import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

// const apiUrl = `${process.env.REACT_APP_API_CODE}`;
// const apiUrl = 'http://localhost:9000';
const apiUrl = 'http://192.168.100.62:9000';
const httpClient = fetchUtils.fetchJson;


const changeBlobToBase64 =async (files) => {
    const blobFetch = await fetch(files).then(r => r.blob());

    return new Promise( (resolve, reject) => {
        const reader = new FileReader()
        reader.onload =  () =>
        {
            resolve(reader.result)
        }

        reader.onerror = reject;

        reader.readAsDataURL(blobFetch);
    })
}

const handleParamForFileUpload = async (params) => {
    const files = params.data.report;
    if(files.question1.file){
        files.question1.file.src = await changeBlobToBase64(files.question1.file.src)
    }
    if(files.question2.file){
        files.question2.file.src = await changeBlobToBase64(files.question2.file.src)
    }
    if(files.question3.file){
        files.question3.file.src = await changeBlobToBase64(files.question3.file.src)
    }
    if(files.question4.file){
        files.question4.file.src = await changeBlobToBase64(files.question4.file.src)
    }
    if(files.question5.file){
        files.question5.file.src = await changeBlobToBase64(files.question5.file.src)
    }
    if(files.question6.file){
        files.question6.file.src = await changeBlobToBase64(files.question6.file.src)
    }
    if(files.question7.file){
        files.question7.file.src = await changeBlobToBase64(files.question7.file.src)
    }
    if(files.question8.file){
        files.question8.file.src = await changeBlobToBase64(files.question8.file.src)
    }
    return files;
}

export default {
    getList: (resource, params) => {

        const { page, perPage } = params.pagination;
        // console.log("Get List");
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;


        return httpClient(url).then(({ headers, json }) => {

            // console.log(headers)
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }

            return {
                data: json.map(resource => ({ ...resource, id: resource._id }) ),
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };
        }).catch((err) => {
            // console.log(err)
            

        });

    },

    getOne: (resource, params) =>{
        // console.log('resource')
        if(resource === 'profile'){
            // console.log("Get One Profile")
            const userId = localStorage.getItem('userid')
            // console.log(userId)
             return httpClient(`${apiUrl}/user/${userId}`).then(({ json }) => ({
            data:  { ...json, id: json._id },
        }))
            // profileHandler(resource, params);
        }else{
            console.log("Get One")
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data:  { ...json, id: json._id },
        }))
        }
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ _id: params.ids }),
        };
        // console.log(query)
        // console.log("Get Many")
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // console.log(url)
        return httpClient(url).then(({ json }) => ({ data: json.map(resource => ({ ...resource, id: resource._id }) ), }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        // console.log("Many Reference")
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id: resource._id }) ),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...json, id: json._id },
        }));
    },

    create: async (resource, params) =>{
        if(resource === 'reportyear' || resource === 'reportsemester'){
            await handleParamForFileUpload(params, resource)
            .then(
            (results) => {
                params.data.report = results;
                console.log(params.data)
            })
        }
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => {
            
            return {
                 data: { ...params.data, id: json._id },
            }
        })},

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ 
               data: { ...json, id: json._id },
        })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
