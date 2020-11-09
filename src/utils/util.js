import { resourcePath } from 'config/baseUrl'
import dayjs from 'dayjs'

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
const deepCopy = (obj, cache = []) => {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	const hit = cache.filter(c => c.original === obj)[0];
	if (hit) {
		return hit.copy
	}

	const copy = Array.isArray(obj) ? [] : {}
	cache.push({
		original: obj,
		copy
	})

	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key], cache)
	})

	return copy
};

/**
* 时间转换时间戳
* @param  {string} time '2019-08-01 12:12:12'
* @return {number}
*/
const date2Timestamp = date => {
	if (typeof date !== 'string') {
		date = date + '';
	}
	return new Date(date).getTime();
};

/**
 * 格式化日期
 * @param {string}
 * @return {HTML}
 */
const formatDate = (date, format='YYYY-MM-DD HH:ss:mm') => {
	return dayjs(date).format(format);
}

/**
* 获取url参数
* @param {string} url
* @return {Obejct}
*/
const getUrlParams = (url, name) => {
	const pattern = /(\w+)=(\w+)/ig;
	let params = {};
	url.replace(pattern, function (a, b, c) {
		params[b] = c;
	});
	return name in params ? params[name] : params;
};

/**
* 返回一个新数组，数组中的元素为指定属性的值
* @param  {Array} arr
* @param  {string} key
* @return {Array}
*/
const pluck = (arr, key) => {
	if (typeof arr !== 'object' || arr.length === 0) {
		return []
	}
	if (!key) {
		return arr
	}
	return arr.map(a => a[key])
};

/**
 * 返回指定范围内的一个整数
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
};

/**
* 生成字符串组合
* @param  {number} size
* @return {string}
*/
const randString = (size = 1, symbols = '') => {
	let result = ''
	let allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	if (symbols.length) {
		allChar += symbols
	}

	while (size--) {
		result += allChar.charAt(rand(0, allChar.length - 1))
	}

	return result
};

/**
* 生成随机密码组合
* @param  {number} size 长度，默认8位，包含数字、字母、部分符号
* @return {string}
*/
const randPass = (size = 8, symbols = '._-~@#%^&+=$!') => {
	return this.randString(size, symbols);
};

/**
* 格式化数字
* @param  {number} num
* @param  {string} str
* @return {string} 123456789.00 => 1234,4568,9.00
*/
const toThousandFilter = (num, str = ',') => {
	num = parseFloat(num.toString().replace(/(\d+)(\.\d{2})(\d+)/g, '$1$2'));
	let [integer, decimal] = String.prototype.split.call(num, '.');
	integer = integer.replace(/\d(?=(\d{3})+$)/g, `$&${str}`);
	return integer + (decimal ?  '.' + decimal : '');
};

/**
 * JS 拷贝实现
 * @param {string} text
 * @param {Function} callback
 */
const copy = (text, callback) => {
	var textarea = document.createElement('textarea');
	textarea.id = 'copyBoard';
	textarea.value = text;
	textarea.style.opacity = 0;
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand('copy');
		console.log('复制成功', text);
	} catch (err) {
		console.log('复制失败:', err);
	}
	document.body.removeChild(textarea);
	typeof callback === 'function' && callback();
}

/**
 * JS 下载实现
 * @param {string} url
 * @param {string} filename
 * @return {*}
 */
const download = (url, filename) => {
	var downlink = document.createElement('a');
	downlink.setAttribute('href', url);
	downlink.setAttribute('download', filename);

	var clickEvent = new MouseEvent('click');
	downlink.dispatchEvent(clickEvent);
}

/**
 * 数组扁平化
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
const flatten = (arr, depth = 1) => {
	if (depth <= 0) return arr.slice();
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
}

/**
 * 判断是否空对象
 * @param {Object} obj
 * @return {boolean}
 */
const isEmptyObject = obj => {
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		throw new TypeError('object needed.')
	}
	return Object.keys(obj).length == 0;
}

/**
 * 获取图片绝对路径
 * @param {string} path
 * @return {string}
 */
const getImgAbsPath = path => {
    if (path && !(/^http(s)?/).test(path)) {
        return resourcePath + path;
    }
    return path;
}

/**
 * HTML 代码转义
 * @param {string}
 * @return {string}
 */
const htmlEncode = html => {
	let strHtml = '';
	if (html.length == 0) return '';
	strHtml = html.replace(/&/g, '&amp;');
	strHtml = strHtml.replace(/</g, '&lt;');
	strHtml = strHtml.replace(/>/g, '&gt;');
	strHtml = strHtml.replace(/ /g, '&nbsp;');
	strHtml = strHtml.replace(/'/g, '&#39;');
	strHtml = strHtml.replace(/"/g, '&quot;');
	strHtml = strHtml.replace(/\n/g, '<br/>');
	return strHtml;
}

/**
 * HTML 代码反转义
 * @param {string}
 * @return {string}
 */
const htmlDecode = strHtml => {
	let html = '';
	if (strHtml.length == 0) return '';
	html = strHtml.replace(/&amp;/g, '&');
	html = html.replace(/&lt;/g, '<');
	html = html.replace(/&gt;/g, '>');
	html = html.replace(/&nbsp;/g, ' ');
	html = html.replace(/&#39;/g, '\'');
	html = html.replace(/&quot;/g, '"');
	html = html.replace(/<br\/>/g, '\n');
	return html;
}


/**
 * 防抖函数
 * @param {*} fn
 * @param {*} wait
 */
const debounce = (fn, wait = 500) => {
    let timer = null
    return function() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait);
    }
}

/**
 * 格式化手机号码
 * @param {*} val
 */
const formatPhone = val => {
    return val.replace(/\s/g, '').replace(/^(\d{3})(\d{0,4})(\d{0,4})/g, function (match, p1, p2, p3) {
        return `${p1} ${p2}${p3 ? ' ' : ''}${p3}`
    })
}

export {
	deepCopy,
	flatten,
	date2Timestamp,
	getUrlParams,
	pluck,
	randString,
	randPass,
	toThousandFilter,
	copy,
	download,
	isEmptyObject,
	getImgAbsPath,
	htmlEncode,
	htmlDecode,
	formatDate,
    debounce,
    formatPhone
}
