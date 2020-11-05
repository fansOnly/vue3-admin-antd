import { post, upload, useMock } from 'utils/http'

useMock && require('./mock/common.js')

// 登录
export const login = params => post('/common/login', params)
// 登出
export const logout = params => post('/common/logout', params)

// 上传接口
export const uploadFile = params => upload('/common/upload', params)
export const uploadMultiFile = params => upload('/common/bulkupload', params)

// 全局搜索接口
export const searchGlobal = params => post('/common/search', params)

// 检查用登录哭状态
export const checkLoginStatus = () => post('/common/checkloginstatus')
// 获取未读消息
export const getUnReadmsgCount = () => post('/common/unreadmsgcount')
// 获取用户权限
export const getAuthorityList = () => post('/common/authority')
