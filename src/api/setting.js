import { post, useMock, upload } from 'utils/http'

useMock && require('./mock/setting.js')

// 获取系统基本设置
export const getSiteInfo = () => post('/siteinfo/detail')
export const updateSiteInfo = params => post('/siteinfo/update', params)

export const getHotword = () => post('/siteinfo/hotword/list')
export const addHotword = params => post('/siteinfo/hotword/add', params)
export const deleteHotword = params => post('/siteinfo/hotword/delete', params)

export const getUploadSetting = () => post('/siteinfo/upload/detail')
export const updateUploadSetting = params => post('/siteinfo/upload/update', params)

export const uploadFile = params => upload('/common/upload', params)
export const uploadMultiFile = params => upload('/common/uploadMulti', params)

// ***********************************系统资源相关API**********************************************
// 获取系统资源列表
export const getAssetsList = params => post('/asset/list', params)
// 删除系统资源
export const deleteAssets = params => post('/asset/delete', params)


// ***********************************菜单栏**********************************************
