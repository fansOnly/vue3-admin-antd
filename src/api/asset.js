import { post, useMock } from 'utils/http'

useMock && require('./mock/asset.js')

// 获取系统资源列表
export const getAssetsList = params => post('/asset/list', params)
// 删除系统资源
export const deleteAssets = params => post('/asset/delete', params)
