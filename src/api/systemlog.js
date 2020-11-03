import { post, useMock } from 'utils/http'

useMock && require('./mock/systemlog.js')

// 获取操作日志列表
export const getOperationlogList = params => post('/systemlog/operation/list', params)
// 删除操作日志
export const deleteOperationlog = params => post('/systemlog/operation/delete', params)

// 获取访问日志列表
export const getAccesslogList = params => post('/systemlog/access/list', params)
// 删除访问日志
export const deleteAccesslog = params => post('/systemlog/access/delete', params)

// 获取用户搜索记录
export const getSearchlogList = params => post('/systemlog/search/list', params)
// 删除用户搜索记录
export const deleteSearchlog = params => post('/systemlog/search/delete', params)
