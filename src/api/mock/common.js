import Mock from 'mockjs';
import { MD5 } from '@/utils/secret'

/**
 * 登陆系统
 */
const login = config => {
    const { username = '', password = '' } = JSON.parse(config.body) ?? {};
    const success = username === 'test' && password === MD5('123456');

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? '登陆成功' : '登陆失败',
        'token': '@guid',
        'id': '@id',
    })
}
Mock.mock(/\/common\/login/, /get|post/i, login);

/**
 * 登陆系统
 */
const logout = () => {
    return Mock.mock({
        'code': '200',
        'msg': '退出登陆',
    })
}
Mock.mock(/\/common\/logout/, /get|post/i, logout);


/**
 * 获取用户权限
 */
const getAuthorityList = () => {
    return Mock.mock({
        'code': '200',
        'msg': 'success',
        'MENU_AUTH_LIST': ['home', 'siteinfo', 'banners', 'articles', 'messages', 'resources', 'admins', 'users', 'systems'],
        'OPERATE_AUTH_LIST': ['add', 'delete', 'edit', 'approve', 'export', '']
    })
}
Mock.mock(/\/common\/authority/, /get|post/i, getAuthorityList);

/**
 * 修改密码
 */
const changePass = config => {
    const { id = '', oldPass = '', newPass = '' } = JSON.parse(config.body) ?? {}
    let success = true
    let msg = '修改成功'
    if (!id || !oldPass || !newPass) {
        success = false
        msg = '修改失败'
    }
    if (oldPass !== MD5('123456')) {
        success = false
        msg = '原始密码输入错误'
    }
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': msg,
    })
}
Mock.mock(/\/common\/changepass/, /get|post/i, changePass);

/**
 * 文件上传
 */
const uploadFile = () => {
    return Mock.mock({
        'code': '200',
        'msg': '上传成功',
        'data': {
            'id': '@id',
            'src': 'https://zos.alipayobjects.com/rmsportal',
            'originalname': '@ctitle',
            'filename': 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'type': 'image/png',
            'size': 18888,
            'state': 1
        }
    })
}
Mock.mock(/\/common\/upload/, /get|post/i, uploadFile);


/**
 * 批量文件上传
 */
const uploadMultiFile = () => {
    return Mock.mock({
        'code': '200',
        'msg': '上传成功',
        'data': [{
            'id': '@id',
            'src': 'https://zos.alipayobjects.com/rmsportal',
            'originalname': '@ctitle',
            'filename': 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'type': 'image/png',
            'size': 18888,
            'state': 1
        }]
    })
}
Mock.mock(/\/common\/bulkupload/, /get|post/i, uploadMultiFile);


/**
 * 全局搜索结果
 */
const searchGlobal = config => {
    const { page = 1, pageSize = 99, state = null, keyword = '' } = JSON.parse(config.body) ?? {};
    const randomLen = 132;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2', '3'];
    let _data = [];

        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'classid': '@id',
                    'title': function() {
                        let val = Mock.Random.ctitle(5,20)
                        if (keyword) {
                            const str = val.charAt(Mock.Random.integer(0, val.length-1))
                            const reg = new RegExp(str, 'g')
                            val = val.replace(reg, keyword)
                        }
                        return val
                    },
                    'create_time': '@datetime',
                    'state': function () {
                        const random = Mock.Random.integer(0, states.length - 1);
                        return state ?? states[random];
                    },
                })
            )
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

Mock.mock(/\/common\/search/, /get|post/i, searchGlobal);
