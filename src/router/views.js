/**
 * 路由菜单配置
 * @param {path}
 *          路由地址
 * @param {name}
 *          路由名称
 * @param {component}
 *          路由渲染组件
 * @param {alias}
 *          路由别称
 * @param {redirect}
 *          路由重定向地址
 * @param {meta}
 *          路由元信息
 * @param {meta.key}
 *          左侧菜单标识，回显左侧菜单当前选择项
 * @param {meta.icon}
 *          左侧菜单图标
 * @param {meta.breadcrumbName}
 *          面包屑名称，为空则不显示在面包屑导航
 * @param {meta.depth}
 *          路由层级，回显面包屑导航返回按钮，depth > 2 时显示返回按钮
 * @param {meta.hidden}
 *          左侧菜单显示开关，为 true 则不显示
 * @param {meta.hiddenChildren}
 *          左侧菜单下拉开关，为 true 则显示为正常的点击菜单，为 false 则显示为带下拉的父级菜单
 */
const viewRoutes = [
    {
        path: '/admin/index',
        name: 'index',
        component: () => import(/** webpackChunkName: "page" */ 'views/welcome/index.vue'),
        alias: '/admin',
        meta: {
            key: 'index',
            icon: 'home',
            breadcrumbName: '首页',
            depth: 1,
        }
    },
    {
        path: '/admin/siteinfo',
        name: 'siteinfo',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'siteinfo',
            icon: 'setting',
            breadcrumbName: '站点设置',
            depth: 1,
        },
        children: [
            {
                path: '/admin/siteinfo/site',
                name: 'site',
                component: () => import(/** webpackChunkName: "page" */ 'views/siteinfo/site/index.vue'),
                meta: {
                    key: 'siteinfo.site',
                    breadcrumbName: '基本设置',
                    depth: 2,
                },
            },
            {
                path: '/admin/siteinfo/upload',
                name: 'upload',
                component: () => import(/** webpackChunkName: "page" */ 'views/siteinfo/upload/index.vue'),
                meta: {
                    key: 'siteinfo.upload',
                    breadcrumbName: '上传设置',
                    depth: 2,
                },
            },
        ]
    },
    // {
    //     path: '/admin/banner',
    //     name: 'banners',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'banners',
    //         icon: 'picture',
    //         breadcrumbName: '幻灯片中心', // 幻灯片中心
    //         // breadcrumbName: 'MENU.MENU13', // 幻灯片中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/banner/list',
    //             name: 'banner',
    //             component: () => import('views/banner/index.vue'),
    //             meta: {
    //                 key: 'banner.index',
    //                 breadcrumbName: '幻灯片列表', // 幻灯片列表
    //                 // breadcrumbName: 'MENU.MENU13_1', // 幻灯片列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/banner/edit/:id',
    //             name: 'bannerEdit',
    //             component: () => import('views/banner/view.vue'),
    //             meta: {
    //                 key: 'banner.index',
    //                 breadcrumbName: '编辑幻灯片', // 编辑幻灯片
    //                 // breadcrumbName: 'MENU.MENU13_2', // 编辑幻灯片
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/banner/add',
    //             name: 'bannerAdd',
    //             component: () => import('views/banner/view.vue'),
    //             meta: {
    //                 key: 'banner.index',
    //                 breadcrumbName: '新增幻灯片', // 新增幻灯片
    //                 // breadcrumbName: 'MENU.MENU13_3', // 新增幻灯片
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/banner/class',
    //             name: 'bannerClass',
    //             component: () => import('views/banner/class/index.vue'),
    //             meta: {
    //                 key: 'banner.class',
    //                 breadcrumbName: '幻灯片分类', // 幻灯片分类
    //                 // breadcrumbName: 'MENU.MENU13_4', // 幻灯片分类
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         }
    //     ]
    // },
    // {
    //     path: '/admin/member',
    //     name: 'members',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'members',
    //         icon: 'user',
    //         breadcrumbName: '会员中心', // 会员中心
    //         // breadcrumbName: 'MENU.MENU3', // 会员中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/member/list',
    //             name: 'member',
    //             component: () => import('views/member/index.vue'),
    //             meta: {
    //                 key: 'member.index',
    //                 breadcrumbName: '会员列表', // 会员列表
    //                 // breadcrumbName: 'MENU.MENU3_1', // 会员列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },

    //         },
    //         {
    //             path: '/admin/member/edit/:id',
    //             name: 'memberEdit',
    //             component: () => import('views/member/view.vue'),
    //             meta: {
    //                 key: 'member.index',
    //                 breadcrumbName: '编辑会员', // 编辑会员
    //                 // breadcrumbName: 'MENU.MENU3_2', // 编辑会员
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/member/add',
    //             name: 'memberAdd',
    //             component: () => import('views/member/view.vue'),
    //             meta: {
    //                 key: 'member.index',
    //                 breadcrumbName: '新增会员', // 新增会员
    //                 // breadcrumbName: 'MENU.MENU3_3', // 新增会员
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/article',
    //     name: 'articles',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'articles',
    //         icon: 'table',
    //         breadcrumbName: '文章中心', // 文章中心
    //         // breadcrumbName: 'MENU.MENU4', // 文章中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/article/list',
    //             name: 'article',
    //             component: () => import('views/article/index.vue'),
    //             meta: {
    //                 key: 'article.index',
    //                 breadcrumbName: '文章列表', // 文章列表
    //                 // breadcrumbName: 'MENU.MENU4_2', // 文章列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/article/edit/:id',
    //             name: 'articleEdit',
    //             component: () => import('views/article/view.vue'),
    //             meta: {
    //                 key: 'article.index',
    //                 breadcrumbName: '编辑文章', // 编辑文章
    //                 // breadcrumbName: 'MENU.MENU4_3', // 编辑文章
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/article/add',
    //             name: 'articleAdd',
    //             component: () => import('views/article/view.vue'),
    //             meta: {
    //                 key: 'article.index',
    //                 breadcrumbName: '新增文章', // 新增文章
    //                 // breadcrumbName: 'MENU.MENU4_4', // 新增文章
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/article/section/list',
    //             name: 'section',
    //             component: () => import('views/article/section/index.vue'),
    //             meta: {
    //                 key: 'article.section',
    //                 breadcrumbName: '文章分类', // 文章分类
    //                 // breadcrumbName: 'MENU.MENU4_1', // 文章分类
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/article/section/edit/:id',
    //             name: 'sectionEdit',
    //             component: () => import('views/article/section/view.vue'),
    //             meta: {
    //                 key: 'article.section',
    //                 breadcrumbName: '编辑文章分类', // 编辑文章分类
    //                 // breadcrumbName: 'MENU.MENU4_6', // 编辑文章分类
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/article/section/add',
    //             name: 'sectionAdd',
    //             component: () => import('views/article/section/view.vue'),
    //             meta: {
    //                 key: 'article.section',
    //                 breadcrumbName: '新增文章分类', // 新增文章分类
    //                 // breadcrumbName: 'MENU.MENU4_7', // 新增文章分类
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/article/recycle',
    //             name: 'articleRecycle',
    //             component: () => import('views/article/recycle/index.vue'),
    //             meta: {
    //                 key: 'article.recycle',
    //                 breadcrumbName: '回收站', // 回收站
    //                 // breadcrumbName: 'MENU.MENU4_5', // 回收站
    //                 depth: 2,
    //                 optionList: ['还原', '删除', '清空']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/product',
    //     name: 'products',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'products',
    //         icon: 'project',
    //         breadcrumbName: '产品中心', // 产品中心
    //         // breadcrumbName: 'MENU.MENU11', // 产品中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/product/list',
    //             name: 'product',
    //             component: () => import('views/product/index.vue'),
    //             meta: {
    //                 key: 'product.index',
    //                 breadcrumbName: '产品列表', // 产品列表
    //                 // breadcrumbName: 'MENU.MENU11_2', // 产品列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/product/edit/:id',
    //             name: 'productEdit',
    //             component: () => import('views/product/view.vue'),
    //             meta: {
    //                 key: 'product.index',
    //                 breadcrumbName: '编辑产品', // 编辑产品
    //                 // breadcrumbName: 'MENU.MENU11_3', // 编辑产品
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/product/add',
    //             name: 'productAdd',
    //             component: () => import('views/product/view.vue'),
    //             meta: {
    //                 key: 'product.index',
    //                 breadcrumbName: '新增产品', // 新增产品
    //                 // breadcrumbName: 'MENU.MENU11_4', // 新增产品
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/product/category/list',
    //             name: 'category',
    //             component: () => import('views/product/category/index.vue'),
    //             meta: {
    //                 key: 'product.category',
    //                 breadcrumbName: '产品分类', // 产品分类
    //                 // breadcrumbName: 'MENU.MENU11_1', // 产品分类
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/product/category/edit/:id',
    //             name: 'categoryEdit',
    //             component: () => import('views/product/category/view.vue'),
    //             meta: {
    //                 key: 'product.category',
    //                 breadcrumbName: '编辑产品分类', // 编辑产品分类
    //                 // breadcrumbName: 'MENU.MENU11_6', // 编辑产品分类
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/product/category/add',
    //             name: 'categoryAdd',
    //             component: () => import('views/product/category/view.vue'),
    //             meta: {
    //                 key: 'product.category',
    //                 breadcrumbName: '新增产品分类', // 新增产品分类
    //                 // breadcrumbName: 'MENU.MENU11_7', // 新增产品分类
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/product/recycle',
    //             name: 'productRecycle',
    //             component: () => import('views/product/recycle/index.vue'),
    //             meta: {
    //                 key: 'product.recycle',
    //                 breadcrumbName: '回收站', // 回收站
    //                 // breadcrumbName: 'MENU.MENU11_5', // 回收站
    //                 depth: 2,
    //                 optionList: ['还原', '删除', '清空']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/message',
    //     name: 'messages',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'messages',
    //         icon: 'contacts',
    //         breadcrumbName: '消息中心', // 消息中心
    //         // breadcrumbName: 'MENU.MENU5', // 消息中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/message/list',
    //             name: 'message',
    //             component: () => import('views/message/index.vue'),
    //             meta: {
    //                 key: 'message.index',
    //                 breadcrumbName: '留言列表', // 留言列表
    //                 // breadcrumbName: 'MENU.MENU5_1', // 留言列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '回复', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/message/view/:id',
    //             name: 'messageView',
    //             component: () => import('views/message/view.vue'),
    //             meta: {
    //                 key: 'message.index',
    //                 breadcrumbName: '留言详情', // 留言详情
    //                 // breadcrumbName: 'MENU.MENU5_2', // 留言详情
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/resources',
    //     name: 'resources',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'resources',
    //         icon: 'file-search',
    //         breadcrumbName: '资源中心', // 资源中心
    //         // breadcrumbName: 'MENU.MENU6', // 资源中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/resources/list',
    //             name: 'resourcesList',
    //             component: () => import('views/resources/index.vue'),
    //             meta: {
    //                 key: 'resources.list',
    //                 breadcrumbName: '系统资源', // 系统资源
    //                 // breadcrumbName: 'MENU.MENU6_1', // 系统资源
    //                 depth: 2,
    //                 optionList: ['查看', '删除']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/account',
    //     name: 'accounts',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'accounts',
    //         icon: 'team',
    //         breadcrumbName: '账号中心', // 账号中心
    //         // breadcrumbName: 'MENU.MENU7', // 账号中心
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/account/list',
    //             name: 'account',
    //             component: () => import('views/account/index.vue'),
    //             meta: {
    //                 key: 'account.index',
    //                 breadcrumbName: '管理员列表', // 管理员列表
    //                 // breadcrumbName: 'MENU.MENU7_1', // 管理员列表
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/account/edit/:id',
    //             name: 'accountEdit',
    //             component: () => import('views/account/view.vue'),
    //             meta: {
    //                 key: 'account.index',
    //                 breadcrumbName: '编辑管理员', // 编辑管理员
    //                 // breadcrumbName: 'MENU.MENU7_6', // 编辑管理员
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/account/add',
    //             name: 'accountAdd',
    //             component: () => import('views/account/view.vue'),
    //             meta: {
    //                 key: 'account.index',
    //                 breadcrumbName: '新增管理员', // 新增管理员
    //                 // breadcrumbName: 'MENU.MENU7_7', // 新增管理员
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/account/role/list',
    //             name: 'accountRole',
    //             component: () => import('views/account/role/index.vue'),
    //             meta: {
    //                 key: 'account.role',
    //                 breadcrumbName: '管理员角色', // 管理员角色
    //                 // breadcrumbName: 'MENU.MENU7_2', // 管理员角色
    //                 depth: 2,
    //                 hiddenChildren: true,
    //                 optionList: ['查看', '新增', '修改', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/account/role/edit/:id',
    //             name: 'roleEdit',
    //             component: () => import('views/account/role/view.vue'),
    //             meta: {
    //                 key: 'account.role',
    //                 breadcrumbName: '编辑管理员角色', // 编辑管理员角色
    //                 // breadcrumbName: 'MENU.MENU7_3', // 编辑管理员角色
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //         {
    //             path: '/admin/account/role/add',
    //             name: 'roleAdd',
    //             component: () => import('views/account/role/view.vue'),
    //             meta: {
    //                 key: 'account.role',
    //                 breadcrumbName: '新增管理员角色', // 新增管理员角色
    //                 // breadcrumbName: 'MENU.MENU7_4', // 新增管理员角色
    //                 depth: 3,
    //                 hidden: true
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/statics',
    //     name: 'statics',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'statics',
    //         icon: 'bar-chart',
    //         breadcrumbName: '数据统计', // 数据统计
    //         // breadcrumbName: 'MENU.MENU14', // 数据统计
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/statics/search',
    //             name: 'searchStatics',
    //             component: () => import('views/statics/search/index.vue'),
    //             meta: {
    //                 key: 'statics.search',
    //                 breadcrumbName: '搜索记录统计', // 搜索记录统计
    //                 // breadcrumbName: 'MENU.MENU14_1', // 搜索记录统计
    //                 depth: 2,
    //                 optionList: ['查看', '删除']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/user',
    //     name: 'users',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'users',
    //         icon: 'export',
    //         breadcrumbName: '个人设置', // 个人设置
    //         // breadcrumbName: 'MENU.MENU8', // 个人设置
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/user/userinfo',
    //             name: 'editUserInfo',
    //             component: () => import('views/user/userInfo.vue'),
    //             meta: {
    //                 key: 'user.editinfo',
    //                 breadcrumbName: '修改资料', // 修改资料
    //                 // breadcrumbName: 'MENU.MENU8_1', // 修改资料
    //                 depth: 2,
    //                 optionList: ['修改']
    //             },
    //         },
    //         {
    //             path: '/admin/user/changepass',
    //             name: 'changepass',
    //             component: () => import('views/user/changePass.vue'),
    //             meta: {
    //                 key: 'user.changepass',
    //                 breadcrumbName: '修改密码', // 修改密码
    //                 // breadcrumbName: 'MENU.MENU8_2', // 修改密码
    //                 depth: 2,
    //                 optionList: ['修改']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/systemlog',
    //     name: 'systemlog',
    //     component: () => import('views/index/view.vue'),
    //     meta: {
    //         key: 'systemlog',
    //         icon: 'exception',
    //         breadcrumbName: '系统日志', // 系统日志
    //         // breadcrumbName: 'MENU.MENU12', // 系统日志
    //         depth: 1,
    //     },
    //     children: [
    //         {
    //             path: '/admin/systemlog/operation',
    //             name: 'operationLog',
    //             component: () => import('views/systemlog/operation/index.vue'),
    //             meta: {
    //                 key: 'systemlog.operation',
    //                 breadcrumbName: '操作日志', // 操作日志
    //                 // breadcrumbName: 'MENU.MENU12_1', // 操作日志
    //                 depth: 2,
    //                 optionList: ['查看', '删除']
    //             },
    //         },
    //         {
    //             path: '/admin/systemlog/access',
    //             name: 'accessLog',
    //             component: () => import('views/systemlog/access/index.vue'),
    //             meta: {
    //                 key: 'systemlog.access',
    //                 breadcrumbName: '访问日志', // 访问日志
    //                 // breadcrumbName: 'MENU.MENU12_2', // 访问日志
    //                 depth: 2,
    //                 optionList: ['查看', '删除']
    //             },
    //         },
    //     ]
    // },
    // {
    //     path: '/admin/search',
    //     name: 'search',
    //     component: () => import('views/search/index.vue'),
    //     meta: {
    //         key: 'search',
    //         icon: 'search',
    //         breadcrumbName: '搜索结果',  // 搜索结果
    //         // breadcrumbName: 'MENU.MENU10',  // 搜索结果
    //         depth: 1,
    //         hidden: true
    //     }
    // },
];

export default viewRoutes;
