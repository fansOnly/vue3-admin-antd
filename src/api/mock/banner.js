import Mock from 'mockjs';

/**
 * 获取幻灯片分类列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getBannerClassList = config => {
    const { page = 1, pageSize = 99, state = '' } = JSON.parse(config.body) ?? {};
    const randomLen = 6;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'title': '@ctitle',
                    'content': '@cparagraph(1)',
                    'create_time': '@datetime',
                    'update_time': '@datetime',
                    'state': 1,
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

Mock.mock(/\/banner\/class\/list/, /get|post/i, getBannerClassList);

/**
 * 获取幻灯片分类详情
 * @param {string} id
 */
const getBannerClassDetail = config => {
    const { id = '' } = JSON.parse(config.body) ?? {};
    const success = id;

    let _data = {
        'id': '@id',
        'title': '@ctitle',
        'content': '@cparagraph(2)',
        'create_time': '@datetime',
        'update_time': '@datetime',
        'state': 1,
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/banner\/class\/detail/, /get|post/i, getBannerClassDetail);

/**
 * 新增幻灯片分类提交
 * @param {Array} ids
 */
const addBannerClass = config => {
    const { title } = JSON.parse(config.body);
    const success = title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'id': '@id'
    })
}

Mock.mock(/\/banner\/class\/add/, /get|post/i, addBannerClass);

/**
 * 修改幻灯片分类提交
 * @param {string} username
 * @param {string} password
 * @param {string} name
 * @param {*} others
 */
const updateBannerClass = config => {
    const { id = '', title = '' } = JSON.parse(config.body) ?? {};
    const success = id && title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/class\/update/, /get|post/i, updateBannerClass);

/**
 * 删除幻灯片分类
 * @param {Array} ids
 */
const deleteBannerClass = config => {
    const { ids = [] } = JSON.parse(config.body);
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/class\/delete/, /get|post/i, deleteBannerClass);


/**
 * 获取幻灯片列表
 * @param {number} page
 * @param {number} pageSize
 * @param {number} state
 */
const getBannerList = config => {
    const { page = 1, pageSize = 99, state = '' } = JSON.parse(config.body) ?? {};
    const randomLen = 32;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'sortnum': 10 * (pageSize * (page - 1) + i + 1),
                    'title': '@ctitle',
                    'content': '@cparagraph(1)',
                    'classid': '',
                    'url': '@url',
                    'photos': [{
                        'uid': '@id',
                        'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'status': 'done',
                        'width': 100,
                        'height': 100,
                        'state': 1
                    }],
                    'create_time': '@datetime',
                    'state': 1,
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

Mock.mock(/\/banner\/list/, /get|post/i, getBannerList);

/**
 * 获取幻灯片详情
 * @param {string} id
 */
const getBannerDetail = config => {
    const { id = '' } = JSON.parse(config.body) ?? {};
    const success = id;

    let _data = {
        'id': '@id',
        'sortnum': 10,
        'title': '@ctitle',
        'content': '@cparagraph(1)',
        'classid': '',
        'create_time': '@datetime',
        'url': '@url',
        'photos': [{
            'uid': '@id',
            'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 100,
            'height': 100,
            'state': 1
        }],
        'file': [],
        'state': 1,
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/banner\/detail/, /get|post/i, getBannerDetail);

/**
 * 新增幻灯片提交
 * @param {string} classid
 * @param {string} title
 * @param {*} others
 */
const addBanner = config => {
    const { classid = '', title = '' } = JSON.parse(config.body) ?? {};
    const success = classid && title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'id': '@id'
    })
}

Mock.mock(/\/banner\/add/, /get|post/i, addBanner);

/**
 * 修改幻灯片提交
 * @param {string} id
 * @param {string} classid
 * @param {string} title
 * @param {*} others
 */
const updateBanner = config => {
    const { id = '', classid = '', title = '' } = JSON.parse(config.body) ?? {};
    const success = id && classid && title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/update/, /get|post/i, updateBanner);

/**
 * 删除幻灯片
 * @param {Array} ids
 */
const deleteBanner = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/delete/, /get|post/i, deleteBanner);
