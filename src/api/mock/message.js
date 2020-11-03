import Mock from 'mockjs';
import { getUrlParams } from 'utils/util';

/**
 * 获取留言列表
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} state
 */
const getMessageList = config => {
    const params = getUrlParams(config.url);
    const { page, pageSize, state } = params;
    const randomLen = 38;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : pageSize;
    const states = ['0', '1', '2', '3'];
    let _data = [];
    if (states.indexOf(state) != '-1' || typeof state === 'undefined' || state == '') {
        for (let i = 0; i < len; i++) {
            _data.push(
                Mock.mock({
                    'id': '@id',
                    'nickname': '@cname',
                    'phone': /^1[3456789]\d{9}$/,
                    'email': '@email',
                    'content': '@cparagraph(3)',
                    'reply': '',
                    'photos': [{
                        'uid': '@id',
                        'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'status': 'done',
                        'width': 200,
                        'height': 200
                    },
                    {
                        'uid': '@id',
                        'url': '@image(100x100)',
                        'name': '@ctitle',
                        'type': 'image/png',
                        'size': 18888,
                        'status': 'done',
                        'width': 200,
                        'height': 200
                    }
                    ],
                    'create_time': '@datetime',
                    'reply_time': '@datetime',
                    // 'state|1': ['已下架', '待审核', '已审核', '已置顶'],
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

Mock.mock(/\/message\/list/, /get|post/i, getMessageList);

/**
 * 获取留言详情
 * @param {String} id
 */
const getMessageView = config => {
    const params = getUrlParams(config.url);
    const { id } = params;
    const success = id;

    let n = Math.random();

    let _data = {
        'id': '@id',
        'nickname': '@cname',
        'content': '@cparagraph(3)',
        'reply': function() {
            if (n > 0.5) {
                return Mock.mock('@cparagraph(2)');
            }
        },
        'phone': /^1[3456789]\d{9}$/,
        'email': '@email',
        'create_time': '@datetime',
        'reply_time': function(){
            if (n > 0.5) {
                return Mock.mock('@datetime');
            }
        },
        'photos': [{
            'uid': '@id',
            'url': 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        },
        {
            'uid': '@id',
            'url': '@image(100x100)',
            'name': '@ctitle',
            'type': 'image/png',
            'size': 18888,
            'status': 'done',
            'width': 200,
            'height': 200
        }
        ],
        'state': function () {
            const states = [0, 1, 2, 3];
            const random = Math.floor(Math.random() * states.length);
            return states[random];
        },
    };

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : {}
    })
}

Mock.mock(/\/message\/detail/, /get|post/i, getMessageView);

/**
 * 回复留言
 * @param {String} id
 * @param {String} reply
 * @param {*} others
 */
const updateMessage = config => {
    const params = JSON.parse(config.body);
    const { id, reply } = params;
    const success = id && reply;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/message\/update/, /get|post/i, updateMessage);

/**
 * 删除留言
 * @param {Array} ids
 */
const deleteMessage = config => {
    const params = JSON.parse(config.body);
    const { ids } = params;
    const success = ids.length;

    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/message\/delete/, /get|post/i, deleteMessage);
