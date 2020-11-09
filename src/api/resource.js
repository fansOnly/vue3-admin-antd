import { post, useMock } from 'utils/http'

useMock && require('./mock/resource.js')

// 获取系统资源列表
export const getResourceList = params => post('/resource/list', params)
// 删除系统资源
export const deleteResource = params => post('/resource/delete', params)
