import axios from 'axios';

let { origin } = location // 默认获取当前源为默认baseURL

let instance = axios.create({
    baseURL: origin,
    timeout: 10000 // 如果请求话费了超过 `timeout` 的时间，请求将被中断
});

// 添加请求拦截器, 如token拦截
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器, 如响应的状态拦截，401、500?
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


/**
 * @description http服务
 * @param {object} requestParam { url: string, type: string, params: any, otherConfig?: object }
 * @return Promise
 */
const httpService =  (requestParam = {}) => {
    let { url, type, params, otherConfig } = requestParam; // url: 请求路径, type: 请求类型, params: 请求参数, otherConfig：其他配置
    let defaultConfig = {
        url,
        method: type,
        params 
    }
    if (!!otherConfig) {
        defaultConfig = Object.assign({}, defaultConfig, otherConfig)
    }
    return new Promise((resolve, rejects) => {
        let request = instance.request(defaultConfig)
        request.then((res) => {
            resolve(res.data)
        }).catch(err => rejects(err))
    })
}


export default httpService