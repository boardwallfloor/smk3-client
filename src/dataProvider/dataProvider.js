import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = `${process.env.REACT_APP_API_LINK}`
// const apiUrl = 'http://192.168.100.82:9000'
const httpClient = fetchUtils.fetchJson;


const changeBlobToBase64 =async (files) => {
    const blobFetch = await fetch(files).then(r => r.blob());
    return new Promise( (resolve, reject) => {
        const reader = new FileReader()
        reader.onload =  () =>
        {
            resolve(reader.result)
            // console.log('fired')
        }

        reader.onerror = reject;

        reader.readAsDataURL(blobFetch);
    })
}

const handleParamForFileUpload = async (params, resource) => {
    const files = params.data.report;
    if(resource === 'reportsemester'){
        await Promise.all(Object.keys(files).map( async (key, index) => {
            if (files[key].file){
               return files[key].file.src = await changeBlobToBase64(files[key].file.src)
            }
        }))
    }
    if(resource === 'reportyear'){
        await Promise.all(Object.keys(files).map( async (question, index) => {
            await Promise.all(Object.keys(files[question]).map( async (point1, i) => {
                if(files[question][point1].file){
                    // console.log(`files[${question}][${point1}]`)
                    return files[question][point1].file.src = await changeBlobToBase64(files[question][point1].file.src)
                }
                await Promise.all(Object.keys(files[question][point1]).map( async (point2, int) => {
                        if(files[question][point1][point2].file){
                            // console.log(`files[${question}][${point1}][${point2}]`)
                            return files[question][point1][point2].file.src = await changeBlobToBase64(files[question][point1][point2].file.src)
                        }
                    })
                    )
            }))
            if(question === 'question9' && files[question].file){
                // console.log('test')
                return files[question].file.src = await changeBlobToBase64(files[question].file.src)
            }
        }))

    }
    // console.log(files)
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
        // console.log(url)


        return httpClient(url).then(({ headers, json }) => {

            // console.log('headers')
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
        if(resource === 'profile'){
            // console.log("Get One Profile")
            const userId = localStorage.getItem('userid')
            // console.log(userId)
             return httpClient(`${apiUrl}/user/${userId}`).then(({ json }) => ({
            data:  { ...json, id: json._id },
        }))
            // profileHandler(resource, params);
        }else{
            // console.log("Get One")
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
            // console.log(params)
            await handleParamForFileUpload(params, resource)
            .then(
            (results) => {
                params.data.report = results;
                // console.log('results')
                // console.log(results)
            })
        }
        // console.log('params')
        // console.log(params.data)
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => {
            // console.log('json')
            // console.log(json)
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
