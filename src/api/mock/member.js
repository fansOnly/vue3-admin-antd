import Mock from 'mockjs';
import { getUrlParams } from 'utils/util';

/**
 * 获取会员列表
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} state
 */
const getMemberList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 79;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'sortnum': pageSize * (pageSize * (Number(page) - 1) + i + 1),
                    'name': '@cname',
                    'avatar': '@image(100X️100)',
                    'phone': /^1[3456789]\d{9}$/,
                    'create_time': '@datetime',
                    'last_login_time': '@datetime',
                    'state': function () {
                        const random = Math.floor(Math.random() * states.length);
                        return states[typeof state !== 'undefined' && state != '' ? states.indexOf(state) : random];
                    },
                })
            )
        }
    }

    let _total = 0;
    _total = states.indexOf(state) != '-1' ? Math.floor(Math.random() * randomLen) : randomLen;

    return Mock.mock({
        'code': '200',
        'msg': 'sucesss',
        'data': _data,
        'total': _total,
        'current': page || 1,
        'pageSize': pageSize || 10,
    })
}

Mock.mock(/\/member\/list/, /get|post/i, getMemberList);

/**
 * 获取会员详情
 * @param {String} id
 */
const getMemberDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'sortnum': 20,
        'username': '@name',
        'password': '******',
        'name': '@cname',
        'avatar': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'phone': /^1[3456789]\d{9}$/,
        'email': '@email',
        'gender|1': [0, 1],
        'create_time': '@datetime',
        'last_login_time': '@datetime',
        'state|1': ['已冻结', '待审核', '已审核'],
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/member\/detail/, /get|post/i, getMemberDetail);

/**
 * 新增会员提交
 * @param {String} name
 * @param {String} username
 * @param {String/MD5} password
 * @param {*} others
 */
const addMember = config => {
    const { name, username, password } = JSON.parse(config.body);
    const success = name && username && password;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/member\/class\/add/, /get|post/i, addMember);

/**
 * 修改会员提交
 * @param {String} id
 * @param {String} name
 * @param {String} username
 * @param {String/MD5} password
 * @param {*} others
 */
const updateMember = config => {
    const { id, name, username, password } = JSON.parse(config.body);
    const success = id && name && username && password;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/member\/update/, /get|post/i, updateMember);

/**
 * 删除会员提交
 * @param {Array} ids
 */
const deleteMember = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/member\/delete/, /get|post/i, deleteMember);
