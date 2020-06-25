import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

// const apiUrl = `${process.env.REACT_APP_API_CODE}`;
// const apiUrl = 'http://localhost:9000';
const apiUrl = 'http://192.168.100.62:9000';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        // console.log(params.pagination);
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;


        return httpClient(url).then(({ headers, json }) => {

            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }

                // console.log(json)
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
        });

    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data:  { ...json, id: json._id },
        })),

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

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => {
            console.log(json);
            return {
                 data: { ...params.data, id: json._id },
            }
        }),

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
