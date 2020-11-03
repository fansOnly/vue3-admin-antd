import Mock from 'mockjs';
import { getUrlParams } from 'utils/util';

/**
 * 登陆系统
 */
const login = config => {
    const params = JSON.parse(config.body);
    const { username, password } = params;
    const success = username === 'test' && password === '123456';

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? '登陆成功' : '登陆失败',
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
