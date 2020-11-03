import { post, useMock } from 'utils/http'

useMock && require('./mock/admin.js')

// 获取管理员列表
export const getAdminList = params => post('/admin/index', params)
// 获取管理员详情
export const getAdminDetail = params => post('/admin/detail', params)
// 新增管理员提交
export const addAdmin = params => post('/admin/add', params)
// 修改管理员提交
export const updateAdmin = params => post('/admin/update', params)
// 删除管理员
export const deleteAdmin = params => post('/admin/delete', params)

// 获取密码
export const getAdminPass = params => post('/admin/getpass', params)
// 更新密码
export const updateAdminPass = params => post('/admin/changepass', params)


// 获取管理员分类列表
export const getRoleList = params => post('/role/index', params)
// 获取管理员分类详情
export const getRoleDetail = params => post('/role/detail', params)
// 新增管理员分类提交
export const addRole = params => post('/role/add', params)
// 修改管理员分类提交
export const updateRole = params => post('/role/update', params)
// 删除管理员分类
export const deleteRole = params => post('/role/delete', params)


// 获取全部可配置权限列表
export const getPermissionList = () => post('/admin/permission/index')
// 获取全部可配置权限节点树
export const getPermissionTree = () => post('/admin/permission/tree')
// 获取权限详情
export const getPermissionDetail = params => post('/admin/permission/detail', params)
// 更新权限详情
export const updatePermissionDetail = params => post('/admin/permission/update', params)
