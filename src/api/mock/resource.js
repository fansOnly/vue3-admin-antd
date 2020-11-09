import Mock from 'mockjs';

/**
 * 获取系统资源列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getResourceList = config => {
    const { page = 1, pageSize = 99, state = null } = JSON.parse(config.body) ?? {};
    const randomLen = 68;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];

        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'objectid': '@id',
                    'title': '@ctitle(1,10)',
                    'resource': [{
                        'uid': '@id',
                        'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'status': 'done',
                        'width': 100,
                        'height': 100,
                        'state': function() {
                            const random = Mock.Random.integer(0, states.length - 1);
                            return state ?? states[random];
                        }
                    }],
                    'mimetype': function () {
                        const types = ['image/png', 'image/jpg', 'image/gif', 'video/mp4', 'audio/mp3', 'file/zip', 'file/txt', 'file/rar', 'file/doc'];
                        const random = Math.floor(Math.random() * types.length);
                        return types[random];
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

Mock.mock(/\/resource\/list/, /get|post/i, getResourceList);

/**
 * 删除系统资源文件
 * @param {Array} ids
 */
const deleteResource = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/resource\/delete/, /get|post/i, deleteResource);
