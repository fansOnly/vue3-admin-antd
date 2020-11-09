import Mock from 'mockjs'
import { OPERATION_GROUP } from '@/config/setting'


/**
 * 获取操作日志列表
 */
const getOperationlogList = config => {
    const { page = 1, pageSize = 99, type= '' } = JSON.parse(config.body) ?? {};
    const randomLen = 37;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;

    let _data = [];
    for (let i = 0; i < len; i++) {
        _data.push(
            Mock.mock({
                'id': '@id',
                'adminid': '@id',
                'objectid': '@id',
                'type': function() {
                    if (type) {
                        return type
                    } else {
                        return OPERATION_GROUP[Mock.Random.integer(0, OPERATION_GROUP.length - 1)]
                    }
                },
                'create_time': '@datetime',
            })
        )
    }

    let _total = 0;
    _total = randomLen;

    return Mock.mock({
        'code': '200',
        'msg': 'sucesss',
        'data': _data,
        'total': _total,
        'current': page || 1,
        'pageSize': pageSize || 10,
    })
}

Mock.mock(/\/system\/log\/operation\/list/, /get|post/i, getOperationlogList);

/**
 * 删除操作日志
 * @param {Array} ids
 */
const deleteOperationlog = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? '删除成功' : '删除失败'
    })
}

Mock.mock(/\/system\/log\/operation\/delete/, /get|post/i, deleteOperationlog);

/**
 * 获取访问日志列表
 */
const getAccesslogList = config => {
    const { page = 1, pageSize = 99 } = JSON.parse(config.body) ?? {};
    const randomLen = 37;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;

    let _data = [];
    for (let i = 0; i < len; i++) {
        _data.push(
            Mock.mock({
                'id': '@id',
                'memberid': '@id',
                'path': '@url',
                'depth|1': [1,2,3,4],
                'duration': '@integer(1, 9999)',
                'create_time': '@datetime',
            })
        )
    }

    let _total = 0;
    _total = Math.floor(Math.random() * randomLen);

    return Mock.mock({
        'code': '200',
        'msg': 'sucesss',
        'data': _data,
        'total': _total,
        'current': page || 1,
        'pageSize': pageSize || 10,
    })
}

Mock.mock(/\/system\/log\/access\/list/, /get|post/i, getAccesslogList);

/**
 * 删除访问日志
 * @param {Array} ids
 */
const deleteAccesslog = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? '删除成功' : '删除失败'
    })
}

Mock.mock(/\/system\/log\/access\/delete/, /get|post/i, deleteAccesslog);
