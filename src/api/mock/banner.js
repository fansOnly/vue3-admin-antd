import Mock from 'mockjs';
import { getUrlParams } from 'utils/util';

/**
 * 获取幻灯片分类列表
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} state
 */
const getBannerClassList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 17;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'name': '@ctitle',
                    'content': '@cparagraph(1)',
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

Mock.mock(/\/banner\/class\/list/, /get|post/i, getBannerClassList);

/**
 * 获取幻灯片分类详情
 * @param {String} id
 */
const getBannerClassDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'name': '@ctitle',
        'content': '@cparagraph(2)',
        'create_time': '@datetime',
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
    const { name } = JSON.parse(config.body);
    const success = name;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/class\/add/, /get|post/i, addBannerClass);

/**
 * 修改幻灯片分类提交
 * @param {String} username
 * @param {String} password
 * @param {String} name
 * @param {*} others
 */
const updateBannerClass = config => {
    const params = JSON.parse(config.body);
    const { id, name } = params;
    const success = id && name;

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
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/class\/delete/, /get|post/i, deleteBannerClass);


/**
 * 获取幻灯片列表
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} state
 */
const getBannerList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 9;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'sortnum': 10 * (i + 1),
                    'title': '@ctitle',
                    'content': '@cparagraph(1)',
                    'url': '@url',
                    'image': {
                        'url': '@image(100x100)',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'width': 200,
                        'height': 200
                    },
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
 * @param {String} id
 */
const getBannerDetail = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'sortnum': 10,
        'title': '@ctitle',
        'content': '@cparagraph(1)',
        'create_time': '@datetime',
        'url': '@url',
        'image': {
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        },
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
 * @param {String} classid
 * @param {String} title
 * @param {Array} image
 * @param {*} others
 */
const addBanner = config => {
    const { classid, title, image } = JSON.parse(config.body);
    const success = classid && title && image.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/add/, /get|post/i, addBanner);

/**
 * 修改幻灯片提交
 * @param {String} id
 * @param {String} classid
 * @param {String} title
 * @param {Array} image
 * @param {*} others
 */
const updateBanner = config => {
    const params = JSON.parse(config.body);
    const { id, classid, title, image } = params;
    const success = id && classid && title && image.length;

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
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/banner\/delete/, /get|post/i, deleteBanner);
