import Mock from 'mockjs';
import dayjs from 'dayjs';

/**
 * 获取一周访问量统计
 */
const getVisitsByWeek = () => {
    const success = true;
    let _data = [];
    for (let i = 0; i < 7; i++) {
        _data.push([dayjs().add(i - 7 + 1, 'day').format('YYYY-MM-DD'), Math.floor(Math.random() * 100)]);
    }
    let _total = 0;
    _total = _data.map(item => item[1]).reduce((sum, cur) => sum + cur, 0);
    let _day = 0;
    _day = _data[6][1];
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : [],
        'total': success ? _total : 0,
        'day': success ? _day : 0,
    })
}

Mock.mock(/\/statics\/visit/, /get|post/i, getVisitsByWeek);

/**
 * 获取一周支付数据统计
 */
const getPayByWeek = () => {
    const success = true;
    let _data = [];
    for (let i = 0; i < 7; i++) {
        _data.push([dayjs().add(i - 7 + 1, 'day').format('YYYY-MM-DD'), Math.floor(Math.random() * 10000)]);
    }
    let _total = 0;
    _total = _data.map(item => item[1]).reduce((sum, cur) => sum + cur, 0);
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : [],
        'total': success ? _total : 0,
    })
}

Mock.mock(/\/statics\/pay/, /get|post/i, getPayByWeek);

/**
 * 获取一周搜索用户数统计
 */
const getSearchTotalByWeek = () => {
    const success = true;
    let _data = [];
    for (let i = 0; i < 7; i++) {
        _data.push([dayjs().add(i - 7 + 1, 'day').format('YYYY-MM-DD'), Math.floor(Math.random() * 50)]);
    }
    let _total = 0;
    _total = _data.map(item => item[1]).reduce((sum, cur) => sum + cur, 0);
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : [],
        'total': success ? _total : [],
    })
}

Mock.mock(/\/statics\/searchAll/, /get|post/i, getSearchTotalByWeek);

/**
 * 获取一周人均搜索次数统计
 */
const getSearchAvgByWeek = () => {
    const success = true;
    let _data = [];
    for (let i = 0; i < 7; i++) {
        _data.push([dayjs().add(i - 7 + 1, 'day').format('YYYY-MM-DD'), Math.floor(Math.random() * 10)]);
    }
    let _total = 0;
    _total = _data.map(item => item[1]).reduce((sum, cur) => sum + cur, 0) / 7;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? _data : [],
        'total': success ? _total.toFixed(2) : 0,
    })
}

Mock.mock(/\/statics\/searchAvg/, /get|post/i, getSearchAvgByWeek);

/**
 * 获取全部搜索热词
 */
const getSearchHot = config => {
    const { page = 1, pageSize = 99 } = JSON.parse(config.body) ?? {};
    const randomLen = 31;
    const len = randomLen - pageSize * (page - 1) < pageSize ? randomLen - pageSize * (page - 1) : randomLen;
    let _data = [];
    for (let i = 0; i < len; i++) {
        _data.push(
            Mock.mock({
                'id': pageSize * (Number(page) - 1) + i + 1,
                'name': '@ctitle',
                'total': Math.floor(Math.random() * 100),
                'ratio': (Math.random() * 90).toFixed(2),
                'status': Math.floor(Math.random() * 2)
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

Mock.mock(/\/statics\/searchHot/, /get|post/i, getSearchHot);

/**
 * 获取一周销售金额统计
 */
const getSalesByWeek = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? {
            allData: [
                ['家用电器', '4544', '28.79%', '#1890ff'],
                ['食用酒水', '3321', '21.04%', '#13c2c2'],
                ['个护健康', '3113', '19.73%', '#2fc25b'],
                ['服饰箱包', '2341', '14.83%', '#facc14'],
                ['母婴产品', '1231', '7.80%', '#f04864'],
                ['其他', '1231', '7.80%', '#8543e0']
            ],
            onlineData: [
                ['家用电器', '244', '21.24%', '#1890ff'],
                ['食用酒水', '321', '27.94%', '#13c2c2'],
                ['个护健康', '311', '27.07%', '#2fc25b'],
                ['服饰箱包', '41', '3.57%', '#facc14'],
                ['母婴产品', '121', '10.53%', '#f04864'],
                ['其他', '111', '9.66%', '#8543e0']
            ],
            offlineData: [
                ['家用电器', '99', '10.41%', '#1890ff'],
                ['食用酒水', '188', '19.77%', '#13c2c2'],
                ['个护健康', '344', '36.17%', '#2fc25b'],
                ['服饰箱包', '255', '26.81%', '#facc14'],
                ['其他', '65', '6.83%', '#f04864']
            ]
        } : {
                allData: [],
                onlineData: [],
                offlineData: [],
            }
    })
}

Mock.mock(/\/statics\/sales/, /get|post/i, getSalesByWeek);
