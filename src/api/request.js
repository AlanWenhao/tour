import axios from 'axios';

const instance = axios.create({ baseURL: '//localhost:4000' });

const fetch = (url, method = 'get', data = {}) => {
    const AUTH_TOKEN = window.localStorage.getItem('token');
    if (AUTH_TOKEN) instance.defaults.headers.common.Authorization = AUTH_TOKEN;
    switch (method) {
    case 'get':
        return instance.get(url, { params: data });
    case 'post':
        return instance.post(url, data);
    default:
        return instance.get(url, { params: data });
    }
};

function request(url, method, data) {
    return fetch(url, method, data).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export default request;
