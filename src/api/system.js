import { post, useMock } from 'utils/http'

useMock && require('./mock/system.js')

// 获取操作日志列表
export const getOperationlogList = params => post('/system/log/operation/list', params)
// 删除操作日志
export const deleteOperationlog = params => post('/system/log/operation/delete', params)

// 获取访问日志列表
export const getAccesslogList = params => post('/system/log/access/list', params)
// 删除访问日志
export const deleteAccesslog = params => post('/system/log/access/delete', params)

// 获取用户搜索记录
// export const getSearchlogList = params => post('/system/search/list', params)
// 删除用户搜索记录
// export const deleteSearchlog = params => post('/system/search/delete', params)
