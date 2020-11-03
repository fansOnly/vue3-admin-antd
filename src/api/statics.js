import { post, useMock } from 'utils/http'

useMock && require('./mock/statics.js')

// ***********************************echart相关数据**********************************************
// 获取一周访问量统计
export const getVisitsByWeek = params => post('/statics/visit', params)

// 获取一周支付数据统计
export const getPayByWeek = params => post('/statics/pay', params)

// 获取一周搜索用户数统计
export const getSearchTotalByWeek = params => post('/statics/searchAll', params)

// 获取一周平均搜索次数统计
export const getSearchAvgByWeek = params => post('/statics/searchAvg', params)

// 获取全部搜索热词
export const getSearchHot = params => post('/statics/searchHot', params)

// 获取一周销售金额统计
export const getSalesByWeek = params => post('/statics/sales', params)
