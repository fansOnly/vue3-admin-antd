import { post, useMock } from 'utils/http'

useMock && require('./mock/product.js')

// 获取产品分类树
export const getCategoryTree = () => post('/product/category/tree')
// 获取产品分类列表
export const getCategoryIndex = () => post('/product/category/index')
// 获取产品分类详情
export const getCategoryDetail = params => post('/product/category/detail', params)
// 新增产品分类
export const addCategory = params => post('/product/category/add', params)
// 更新产品分类
export const updateCategory = params => post('/product/category/update', params)
// 删除产品分类
export const deleteCategory = params => post('/product/category/delete', params)


// 获取产品列表
export const getProductList = params => post('/product/list', params)
// 获取产品详情
export const getProductDetail = params => post('/product/detail', params)
// 新增产品
export const addProduct = params => post('/product/add', params)
// 更新产品
export const updateProduct = params => post('/product/update', params)
// 删除产品
export const deleteProduct = params => post('/product/delete', params)
// 获取产品回收站列表
export const getProductRecycleList = params => post('/product/recycle', params)
// 还原产品
export const restoreProduct = params => post('/product/restore', params)
// 清除产品
export const clearProduct = params => post('/product/clear', params)
// 清空回收站
export const clearAll = params => post('/product/clearAll', params)
