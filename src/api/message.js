import { post, useMock } from 'utils/http'

useMock && require('./mock/message.js')

// 获取留言列表
export const getMessageList = params => post('/message/list', params)
// 获取留言详情
export const getMessageDetail = params => post('/message/detail', params)
// 回复留言
export const updateMessage = params => post('/message/update', params)
// 删除留言
export const deleteMessage = params => post('/message/delete', params)
