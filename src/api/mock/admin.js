import Mock from 'mockjs';
import { getUrlParams } from 'utils/util';

/**
 * 获取管理员列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getAdminList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 8;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'username': '@word(5,10)',
                    'nickname': '@cname',
                    'phone': /^1[3456789]\d{9}$/,
                    'create_time': '@datetime',
                    'last_login_time': '@datetime',
                    'last_login_ip': '127.0.0.1',
                    'role_name|1': ['超级管理员', '系统管理员', '审核管理员', '普通管理员'],
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

Mock.mock(/\/admin\/index/, /get|post/i, getAdminList);

/**
 * 获取管理员详情
 * @param {string} id
 */
const getAdminDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'username': '@word(5,10)',
        'password': '@string(10)',
        'nickname': '@cname',
        'avatar': '@image',
        'phone': /^1[3456789]\d{9}$/,
        'email': '@email',
        'intro': '@cparagraph(2)',
        'create_time': '@datetime',
        'last_login_time': '@datetime',
        'last_login_ip': '127.0.0.1',
        'role_name|1': ['超级管理员', '系统管理员', '审核管理员', '普通管理员'],
        'state|1': ['禁用', '正常'],
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/admin\/detail/, /get|post/i, getAdminDetail);

/**
 * 新增管理员提交
 * @param {Array} ids
 */
const addAdmin = config => {
    const { username, password, name } = JSON.parse(config.body);
    const success = username && password && name;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/admin\/add/, /get|post/i, addAdmin);

/**
 * 修改管理员提交
 * @param {string} username
 * @param {string} password
 * @param {string} name
 * @param {*} others
 */
const updateAdmin = config => {
    const params = JSON.parse(config.body);
    const { id, username, password, name } = params;
    const success = id && username && password && name;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/admin\/update/, /get|post/i, updateAdmin);

/**
 * 删除管理员
 * @param {Array} ids
 */
const deleteAdmin = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/admin\/delete/, /get|post/i, deleteAdmin);

/**
 * 获取管理员分类列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getRoleList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 4;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'name': ['超级管理员', '系统管理员', '审核管理员', '普通管理员'][i],
                    'permission': function () {
                        const status = [{menu: '基本设置', options: ['修改', '删除']}, {menu: '幻灯片管理', options: ['修改', '删除']}, {menu: '信息发布', options: ['修改', '删除']}, {menu: '会员管理', options: ['修改', '删除']}, {menu: '信息删除', options: ['修改', '删除']}];
                        const randomIndex = Math.floor(Math.random() * status.length);
                        let res = [];
                        status.map((item, index) => {
                            if (index <= randomIndex) {
                                res.push(item)
                            }
                        })
                        return res;
                    },
                    'create_time': '@datetime',
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

Mock.mock(/\/role\/index/, /get|post/i, getRoleList);

/**
 * 获取管理员分类详情
 * @param {string} id
 */
const getRoleDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'name': function () {
            const status = ['超级管理员', '系统管理员', '审核管理员', '普通管理员'];
            const randomIndex = Math.floor(Math.random() * status.length);
            return status[randomIndex - 1];
        },
        'permission': function () {
            const arr = ['1', '3', '4', '5', '6', '7', '8', '51', '52', '11', '12', '81', '82', '821', '822', '823'];
            const randomIndex = Math.floor(Math.random() * arr.length);
            let res = [];
            arr.map((item, index) => {
                if (index <= (randomIndex - 1)) {
                    res.push(item);
                }
            })
            return res;
        },
        'create_time': '@datetime',
        'state|1': ['禁用', '正常'],
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/role\/detail/, /get|post/i, getRoleDetail);

/**
 * 新增管理员分类提交
 * @param {string} name
 * @param {Array} permission
 */
const addRole = config => {
    const params = JSON.parse(config.body);
    const { name, permission } = params;
    const success = name && permission.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/role\/add/, /get|post/i, addRole);

/**
 * 修改管理员分类提交
 * @param {string} name
 * @param {Array} permission
 */
const updateRole = config => {
    const params = JSON.parse(config.body);
    const { id, name, permission } = params;
    const success = id && name && permission.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/role\/update/, /get|post/i, updateRole);

/**
 * 删除管理员
 * @param {Array} ids
 */
const deleteRole = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/role\/delete/, /get|post/i, deleteRole);

/**
 * 获取全部可配置权限列表
 */
const getPermissionList = () => {
    const success = true;
    let _data = [{
        'id': '1',
        'pid': '0',
        'value': '1',
        'label': '站点设置栏目权限',
    }, {
        'id': '11',
        'pid': '1',
        'value': '11',
        'label': '基本设置',
    }, {
        'id': '5',
        'pId': '1',
        'value': '5',
        'label': '幻灯片栏目权限',
    }, {
        'id': '51',
        'pId': '5',
        'value': '51',
        'label': '幻灯片分类管理',
    }, {
        'id': '52',
        'pId': '5',
        'value': '52',
        'label': '幻灯片管理',
    }, {
        'id': '12',
        'pId': '1',
        'value': '12',
        'label': '上传设置',
    }, {
        'id': '8',
        'pId': '0',
        'value': '8',
        'label': '文章栏目权限',
    }, {
        'id': '81',
        'pId': '8',
        'value': '81',
        'label': '文章分类管理',
    }, {
        'id': '82',
        'pId': '8',
        'value': '82',
        'label': '文章管理',
    }, {
        'id': '821',
        'pId': '82',
        'value': '821',
        'label': '添加',
    }, {
        'id': '822',
        'pId': '82',
        'value': '822',
        'label': '编辑',
    }, {
        'id': '823',
        'pId': '82',
        'value': '823',
        'label': '删除',
    }, {
        'id': '3',
        'pId': '0',
        'value': '3',
        'label': '会员栏目权限',
    }, {
        'id': '4',
        'pId': '0',
        'value': '4',
        'label': '账号栏目权限',
    }, {
        'id': '6',
        'pId': '0',
        'value': '6',
        'label': '系统资源权限',
    }, {
        'id': '7',
        'pId': '0',
        'value': '7',
        'label': '系统日志权限',
    },];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : []
    })
}

Mock.mock(/\/admin\/permission\/index/, /get|post/i, getPermissionList);

/**
 * 获取全部可配置权限节点树
 */
const getPermissionTree = () => {
    const success = true;
    let _data = [{
        'id': '1',
        'key': '1',
        'title': '站点设置栏目权限',
        'children': [{
            'id': '11',
            'key': '1-11',
            'title': '基本设置',
            'isLeaf': true
        }, {
            'id': '5',
            'key': '1-5',
            'title': '幻灯片栏目权限',
            'children': [{
                'id': '51',
                'key': '1-5-51',
                'title': '幻灯片分类管理',
                'isLeaf': true
            }, {
                'id': '52',
                'key': '1-5-52',
                'title': '幻灯片管理',
                'isLeaf': true
            }]
        },]
    }, {
        'id': '12',
        'key': '12',
        'title': '上传设置',
    }, {
        'id': '8',
        'key': '8',
        'title': '文章栏目权限',
        'children': [{
            'id': '81',
            'key': '8-81',
            'title': '文章分类管理',
            'isLeaf': true
        }, {
            'id': '82',
            'key': '8-82',
            'title': '文章管理',
            'children': [{
                'id': '821',
                'key': '8-82-821',
                'title': '添加',
                'isLeaf': true
            }, {
                'id': '822',
                'key': '8-82-822',
                'title': '编辑',
                'isLeaf': true
            }, {
                'id': '823',
                'key': '8-82-823',
                'title': '删除',
                'isLeaf': true
            }]
        },]
    }, {
        'id': '3',
        'key': '3',
        'title': '会员栏目权限',
    }, {
        'id': '4',
        'key': '4',
        'title': '账号栏目权限',
    }, {
        'id': '6',
        'key': '6',
        'title': '系统资源权限',
    }, {
        'id': '7',
        'key': '7',
        'title': '系统日志权限',
    },];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : []
    })
}

Mock.mock(/\/admin\/permission\/tree/, /get|post/i, getPermissionTree);

/**
 * 获取权限详情
 * @param {string} id
 */
const getPermissionDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'name': '@cname',
        'content': '@cparagraph',
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/admin\/permission\/detail/, /get|post/i, getPermissionDetail);

/**
 * 更新权限详情
 * @param {string} name
 * @param {Array} permission
 */
const updatePermissionDetail = config => {
    const params = JSON.parse(config.body);
    const { id } = params;
    const success = id;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/admin\/permission\/update/, /get|post/i, updatePermissionDetail);
