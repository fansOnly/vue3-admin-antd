import { post, useMock } from 'utils/http'

useMock && require('./mock/article.js')

// 获取文章分类树
export const getSectionTree = () => post('/article/section/tree')
// 获取文章分类列表
export const getSectionIndex = () => post('/article/section/index')
// 获取文章分类详情
export const getSectionDetail = params => post('/article/section/detail', params)
// 新增文章分类
export const addSection = params => post('/article/section/add', params)
// 更新文章分类
export const updateSection = params => post('/article/section/update', params)
// 删除文章分类
export const deleteSection = params => post('/article/section/delete', params)


// 获取文章列表
export const getArticleList = params => post('/article/list', params)
// 获取文章详情
export const getArticleDetail = params => post('/article/detail', params)
// 新增文章
export const addArticle = params => post('/article/add', params)
// 更新文章
export const updateArticle = params => post('/article/update', params)
// 删除文章
export const deleteArticle = params => post('/article/delete', params)
// 获取文章回收站列表
export const getArticleRecycleList = params => post('/article/recycle', params)
// 还原文章
export const restoreArticle = params => post('/article/restore', params)
// 清除文章
export const clearArticle = params => post('/article/clear', params)
// 清空回收站
export const clearAll = params => post('/article/clearAll', params)
