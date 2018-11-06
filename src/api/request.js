import axios from 'axios';

const instance = axios.create({
    baseURL: '//localhost:4000',
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const fetch = (url, method = 'get', data = {}) => {
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
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export default request;
