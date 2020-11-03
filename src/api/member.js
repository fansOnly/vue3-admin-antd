import { post, useMock } from 'utils/http'

useMock && require('./mock/member.js')

// 获取会员列表
export const getMemberList = params => post('/member/list', params)
// 获取会员详情
export const getMemberDetail = params => post('/member/detail', params)
// 新增会员提交
export const addMember = params => post('/member/add', params)
// 修改会员提交
export const updateMember = params => post('/member/update', params)
// 删除会员提交
export const deleteMember = params => post('/member/delete', params)
