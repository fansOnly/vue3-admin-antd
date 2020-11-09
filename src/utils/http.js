/*eslint-env node*/
import axios from 'axios';
import qs from 'qs';
import router from '../router';
import { apiUrl } from 'config/baseUrl';
import { message } from 'ant-design-vue';

const codeMessage = {
	200: '服务器成功返回请求的数据',
	201: '新建或修改数据成功',
	202: '一个请求已经进入后台排队（异步任务）',
	204: '没有返回数据',
	400: '发出的请求有错误',
	401: '用户得到授权，但是访问是被禁止的',
	403: '当前账号被冻结',
	404: '发出的请求针对的是不存在的记录',
	406: '请求的格式不可得',
	410: '请求的资源被永久删除',
	413: '有效负载太大，请求实体大于服务器定义的限制',
	422: '当创建一个对象时，发生一个验证错误',
	500: '服务器发生错误，请检查服务器',
	502: '网关错误',
	503: '服务不可用，服务器暂时过载或维护',
	504: '网关超时',
};

// 挡板数据开关
const useMock = true;

// 设置请求url
axios.defaults.baseURL = apiUrl;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 10000;

const checkRepeatRequest = true;  // 是否开启重复请求检测
const repeatRequestTimeDiff = 3000; // 重复请求检测间隔, 默认3s
let cacheRequest = {};  // 请求缓存
let requestTimestamp = 0;

// 添加请求拦截器
axios.interceptors.request.use(config => {
	// console.log('request:', config)
	if (checkRepeatRequest) {
		const { baseURL, url, data } = config;
		requestTimestamp = +new Date();
		const requestData = data ? JSON.stringify(data) : '';
		if (cacheRequest['url'] === baseURL + url && cacheRequest['data'] === requestData) {
			if (!!cacheRequest['timestamp'] && (requestTimestamp - cacheRequest['timestamp'] <= repeatRequestTimeDiff)) {
				// console.log('重复请求', requestTimestamp - cacheRequest['timestamp'], baseURL + url, requestData);
				return Promise.reject({isRepeatRequest: true});
			}
		}
	}
	const token = sessionStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('request::', config.url, '=>', {...config.data})
	return config;
}, error => {
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
	// console.log('response', response)
	if (checkRepeatRequest) {
		const { url, data } = response.config;
		if (response.status == 200) {
			cacheRequest['url'] = url;
			cacheRequest['data'] = data ? JSON.stringify(data) : '';
			cacheRequest['timestamp'] = requestTimestamp;
		}
	}
	return Promise.resolve(response);
}, error => {
	// console.log('error', error)
	if (error.isRepeatRequest) return;
	if (error.response) {
		const responseCode = error.response.status;
		switch (responseCode) {
			case 401:
				message.error(codeMessage[responseCode], () => {
					sessionStorage.clear();
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					})
				});
				break;
			case 403:
				message.error(codeMessage[responseCode], () => {
					sessionStorage.clear();
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					})
				});
				break;
			case 404:
				handleStatus(responseCode);
				break;
			default:
				handleStatus(responseCode);
				break;
		}
	} else {
		message.error('Error: Network Error');
	}
	// return Promise.resolve(error);
	return Promise.reject(error);
});

const handleStatus = status => {
	message.error(codeMessage[status]);
	throw new Error(codeMessage[status]);
}

const get = (url, params) => {
	if (typeof params !== 'undefined') {
		url += '?' + qs.stringify(params)
	}
	return axios.get(url)
	.then(res => {
		return res.data;
	})
}

const post = (url, params, options = {}) => {
	return axios.post(url, params, {...options})
	.then(res => {
        console.log('response::', url, '=>', res.data)
		return res.data;
	})
}

const upload = (url, params, options = {}) => {
	return axios.post(url, params, {...options, headers: {'Content-Type': 'multipart/form-data'}})
    .then(res => {
        console.log('response::', url, '=>', res.data)
		const responseCode = res.data.code;
		if (responseCode == 500) {
			message.error(res.data.err.message || '上传错误')
		}
		return res.data;
	})
}

export {
	useMock,
	get,
	post,
	upload,
}
