
import axios from 'axios'
import cfg from '@/config'
import store from '@/store'

var Promise = require('es6-promise').Promise;
axios.defaults.baseURL=cfg.apiBaseUrl;
axios.defaults.timeout = cfg.timeout||5000;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    config => {
        config.withCredentials=true;
        config.headers.common['ngs-token'] = store.state.TokenId;
        config.headers.common['ngs-timezoneoffset'] = store.state.TimezoneOffset;
        return config;
    },
    error => {
    	console.log(error)
        return Promise.reject(error);
    });
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
    	console.log(error)
        return Promise.reject(error)
    });
export default axios