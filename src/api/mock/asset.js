import Mock from 'mockjs';

/**
 * 获取系统资源列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getAssetsList = config => {
    const { page = 1, pageSize = 99, state = '' } = JSON.parse(config.body) ?? {};
    const randomLen = 68;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'objectid': '@id',
                    'name': '@string(1,10)',
                    'path': '@image(100x100)',
                    'file': '@image(100x100)',
                    'type': function () {
                        const types = ['image/png', 'image/jpg', 'image/gif', 'video/mp4', 'audio/mp3', 'file/zip', 'file/txt', 'file/rar', 'file/doc'];
                        const random = Math.floor(Math.random() * types.length);
                        return types[random];
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

Mock.mock(/\/asset\/list/, /get|post/i, getAssetsList);

/**
 * 删除系统资源文件
 * @param {Array} ids
 */
const deleteAssets = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/asset\/delete/, /get|post/i, deleteAssets);
