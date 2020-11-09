import Mock from 'mockjs';
import { ARTICLE_TAGS } from '@/config/setting'

/**
 * 获取文章分类列表
 */
const getArticleClassIndex = () => {
    const success = true;
    let _data = [
        {
            'id': '1',
            'adminid': '@id',
            'sortnum': 10,
            'parent_id': '0',
            'path': '0-1',
            'name': '一级分类A',
            'en_name': 'class A',
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
            'url': '@url',
            'content': '@cparagraph(1)',
            'children': [{
                'id': '3',
                'adminid': '@id',
                'sortnum': 30,
                'parent_id': '1',
                'path': '0-1-3',
                'name': '二级分类A-1',
                'en_name': 'class A-1',
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
                'url': '@url',
                'content': '@cparagraph(1)',
                'children': [{
                    'id': '5',
                    'adminid': '@id',
                    'sortnum': 50,
                    'parent_id': '3',
                    'path': '0-1-3-5',
                    'name': '三级分类A-1-1',
                    'en_name': 'class A-1-1',
                    'photos': [],
                    'create_time': '@datetime',
                    'url': '@url',
                    'content': '@cparagraph(1)',
                },]
            },]
        }, {
            'id': '2',
            'adminid': '@id',
            'sortnum': 20,
            'parent_id': '0',
            'path': '0-2',
            'name': '一级分类B',
            'en_name': 'class B',
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
            'url': '@url',
            'content': '@cparagraph(1)',
            'children': [{
                'id': '4',
                'adminid': '@id',
                'sortnum': 40,
                'parent_id': '2',
                'path': '0-2-4',
                'name': '二级分类B-1',
                'en_name': 'class B-1',
                'photos': [],
                'create_time': '@datetime',
                'url': '@url',
                'content': '@cparagraph(1)',
            }, {
                'id': '7',
                'adminid': '@id',
                'sortnum': 40,
                'parent_id': '2',
                'path': '0-2-7',
                'name': '二级分类B-2',
                'en_name': 'class B-2',
                'photos': [],
                'create_time': '@datetime',
                'url': '@url',
                'content': '@cparagraph(1)',
            },]
        }, {
            'id': '6',
            'adminid': '@id',
            'sortnum': 60,
            'parent_id': '0',
            'path': '0-6',
            'name': '一级分类C',
            'en_name': 'class C',
            'photos': [],
            'create_time': '@datetime',
            'url': '@url',
            'content': '@cparagraph(1)',
        },
    ];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : 'error',
        'data': success ? _data : [],
    })
}

Mock.mock(/\/article\/class\/index/, /get|post/i, getArticleClassIndex);

/**
 * 获取文章分类详情
 * @param {string} id
 */
const getArticleClassDetail = config => {
    const params = JSON.parse(config.body);
    const { id } = params;
    const success = id;

    let _data = {
        'id': '@id',
        'sortnum': 10,
        'adminid': '@id',
        'parent_id': '0',
        'path': '0-1',
        'name': '@ctitle',
        'en_name': 'class A',
        'content': '@cparagraph(1)',
        'create_time': '@datetime',
        'url': '@url',
        'photos': [{
            'id': '@id',
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200,
            'state': 1
        }],
        'state': 1
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/article\/class\/detail/, /get|post/i, getArticleClassDetail);

/**
 * 新增文章分类
 * @param {string} title
 * @param {*} others
 */
const addArticleClass = config => {
    const { title = '' } = JSON.parse(config.body) ?? {};
    const success = title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'id': '@id'
    })
}

Mock.mock(/\/article\/class\/add/, /get|post/i, addArticleClass);

/**
 * 更新文章分类
 * @param {string} id
 * @param {string} title
 * @param {*} others
 */
const updateArticleClass = config => {
    const { id = '', title = '' } = JSON.parse(config.body) ?? {};
    const success = id && title;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/article\/class\/update/, /get|post/i, updateArticleClass);

/**
 * 删除文章分类
 * @param {Array} ids
 */
const deleteArticleClass = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/article\/class\/delete/, /get|post/i, deleteArticleClass);

/**
 * 获取文章分类树
 */
const getArticleClassTree = () => {
    const success = true;
    let _data = [{
        'id': '-1',
        'pId': '0',
        'value': '0',
        'label': '作为一级分类',
    }, {
        'id': '1',
        'pId': '0',
        'value': '1',
        'label': '一级分类A',
    }, {
        'id': '3',
        'pId': '1',
        'value': '3',
        'label': '二级分类A-1',
    }, {
        'id': '5',
        'pId': '3',
        'value': '5',
        'label': '三级分类A-1-1',
    }, {
        'id': '2',
        'pId': '0',
        'value': '2',
        'label': '一级分类B',
    }, {
        'id': '4',
        'pId': '2',
        'value': '4',
        'label': '二级分类B-1',
    }, {
        'id': '7',
        'pId': '2',
        'value': '7',
        'label': '二级分类B-2',
    }, {
        'id': '6',
        'pId': '0',
        'value': '6',
        'label': '一级分类C',
    },];

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : []
    })
}

Mock.mock(/\/article\/class\/tree/, /get|post/i, getArticleClassTree);


/**
 * 获取文章列表
 */
const getArticleList = config => {
    const { page = 1, pageSize = 99, state = null, delete_time = '' } = JSON.parse(config.body) ?? {};
    const randomLen = 132;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2', '3'];
    let _data = [];
    for (let i = 0; i < len; i++) {
        _data.push(
            Mock.mock({
                'id': '@id',
                'adminid': '@id',
                'sortnum': 10 * (pageSize * (page - 1) + i + 1),
                'classid': '@id',
                'title': '@ctitle',
                'views': '@integer(0, 9999)',
                'thumbnail': [{
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
                'publish_time': '@datetime',
                'create_time': '@datetime',
                'delete_time': function () {
                    return delete_time == 0 ? 0 : Mock.mock('@datetime');
                },
                'tags': function () {
                    const random = Math.min(Math.floor(Math.random() * ARTICLE_TAGS.length), 3);
                    let _data = [];
                    for (var i = 0; i < ARTICLE_TAGS.length; i++) {
                        if (i <= random) {
                            _data.push(ARTICLE_TAGS[i]);
                        }
                    }
                    return _data;
                },
                'state': function () {
                    const random = Mock.Random.integer(0, states.length-1);
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

Mock.mock(/\/article\/list/, /get|post/i, getArticleList);

/**
 * 获取文章详情
 * @param {string} id
 */
const getArticleDetail = config => {
    const { id = '' } = JSON.parse(config.body) ?? {};
    const success = id;

    let _data = {
        'id': '1',
        'parentid': function () {
            const arr = ['1', '2', '3', '4', '5', '6', '7'];
            const random = Math.floor(Math.random() * arr.length);
            let _res = [];
            arr.map((item, index) => {
                if (index <= random) {
                    _res.push(item)
                }
            })
            return _res;
        },
        'sortnum': 10,
        'title': '@ctitle',
        'intro': '@cparagraph(1)',
        'content': '@cparagraph(3)',
        'views': ~~(Math.random() * 9999),
        'publish_time': '@datetime',
        'create_time': '@datetime',
        'delete_time': 0,
        'url': '@url',
        'thumbnail': [{
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
        'file': [{
            'uid': '@id',
            'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'text/txt',
            'size': 18888,
            'status': 'done',
            'state': 1
        }],
        'photos': [{
            'uid': '@id',
            'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200,
            'state': 1
        }, {
            'uid': '@id',
            'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200,
            'state': 1
        }],
        'tags': function () {
            const arr = ['热点', '技术', '分享', '生活', '教程'];
            const random = Math.min(Math.floor(Math.random() * arr.length), 3);
            let _data = [];
            for (var i = 0; i < arr.length; i++) {
                if (i <= random) {
                    _data.push(arr[i]);
                }
            }
            return _data;
        },
        'state': 1,
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/article\/detail/, /get|post/i, getArticleDetail);

/**
 * 新增文章
 * @param {string} title
 * @param {string} classid
 * @param {*} others
 */
const addArticle = config => {
    const { title = '', classid = '' } = JSON.parse(config.body) ?? {};
    const success = title && classid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'id': '@id'
    })
}

Mock.mock(/\/article\/add/, /get|post/i, addArticle);

/**
 * 更新文章
 * @param {string} id
 * @param {string} title
 * @param {string} classid
 * @param {*} others
 */
const updateArticle = config => {
    const { id = '', title = '', classid = '' } = JSON.parse(config.body) ?? {};
    const success = id && title && classid;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/article\/update/, /get|post/i, updateArticle);

/**
 * 获取文章回收站列表
 */
const getArticleRecycleList = config => {
    const { page = 1, pageSize = 99, state = null } = JSON.parse(config.body) ?? {};
    const randomLen = 57;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2', '3'];
    let _data = [];

        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'adminid': '@id',
                    'sortnum': 10 * (pageSize * (page - 1) + i + 1),
                    'classid': '@id',
                    'title': '@ctitle',
                    'photos': [{
                        'uid': '@id',
                        'path': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'status': 'done',
                        'width': 200,
                        'height': 200,
                        'state': 1
                    }],
                    'create_time': '@datetime',
                    'delete_time': '@datetime',
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

Mock.mock(/\/article\/recycle/, /get|post/i, getArticleRecycleList);

/**
 * 彻底清除文章
 * @param {Array} ids
 */
const clearArticle = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/article\/clear/, /get|post/i, clearArticle);

/**
 * 还原文章
 * @param {Array} ids
 */
const restoreArticle = config => {
    const { ids = [] } = JSON.parse(config.body) ?? {};
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/article\/restore/, /get|post/i, restoreArticle);

/**
 * 清空回收站
 */
const clearAllArticle = () => {
    return Mock.mock({
        'code': '200',
        'msg': 'success'
    })
}

Mock.mock(/\/article\/clearAll/, /get|post/i, clearAllArticle);
