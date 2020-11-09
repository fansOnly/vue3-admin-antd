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
    {
        path: '/admin/banner',
        name: 'banners',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'banners',
            icon: 'picture',
            breadcrumbName: '幻灯片中心',
            depth: 1,
        },
        children: [
            {
                path: '/admin/banner/list',
                name: 'banner',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/index/index.vue'),
                meta: {
                    key: 'banner.index',
                    breadcrumbName: '幻灯片列表',
                    depth: 2,
                    hiddenChildren: true,
                },
            },
            {
                path: '/admin/banner/edit',
                name: 'bannerEdit',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/detail/index.vue'),
                meta: {
                    key: 'banner.index',
                    breadcrumbName: '编辑幻灯片',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/banner/add',
                name: 'bannerAdd',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/detail/index.vue'),
                meta: {
                    key: 'banner.index',
                    breadcrumbName: '新增幻灯片',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/banner/class',
                name: 'bannerClass',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/class/index/index.vue'),
                meta: {
                    key: 'banner.class',
                    breadcrumbName: '幻灯片分类',
                    depth: 2,
                    hiddenChildren: true,
                },
            },
            {
                path: '/admin/banner/class/edit',
                name: 'bannerClassEdit',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/class/detail/index.vue'),
                meta: {
                    key: 'banner.class',
                    breadcrumbName: '编辑幻灯片分类',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/banner/class/add',
                name: 'bannerClassAdd',
                component: () => import(/** webpackChunkName: "banner" */ 'views/banner/class/detail/index.vue'),
                meta: {
                    key: 'banner.class',
                    breadcrumbName: '新增幻灯片分类',
                    depth: 3,
                    hidden: true
                },
            },
        ]
    },
    {
        path: '/admin/article',
        name: 'articles',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'articles',
            icon: 'table',
            breadcrumbName: '文章中心',
            depth: 1,
        },
        children: [
            {
                path: '/admin/article/list',
                name: 'article',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/index/index.vue'),
                meta: {
                    key: 'article.index',
                    breadcrumbName: '文章列表',
                    depth: 2,
                    hiddenChildren: true,
                },
            },
            {
                path: '/admin/article/edit',
                name: 'articleEdit',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/detail/index.vue'),
                meta: {
                    key: 'article.index',
                    breadcrumbName: '编辑文章',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/article/add',
                name: 'articleAdd',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/detail/index.vue'),
                meta: {
                    key: 'article.index',
                    breadcrumbName: '新增文章',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/article/class/list',
                name: 'articleClass',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/class/index/index.vue'),
                meta: {
                    key: 'article.class',
                    breadcrumbName: '文章分类',
                    depth: 2,
                    hiddenChildren: true
                },
            },
            {
                path: '/admin/article/class/edit',
                name: 'articleClassEdit',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/class/detail/index.vue'),
                meta: {
                    key: 'article.class',
                    breadcrumbName: '编辑文章分类',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/article/class/add',
                name: 'articleClassAdd',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/class/detail/index.vue'),
                meta: {
                    key: 'article.class',
                    breadcrumbName: '新增文章分类',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/article/recycle',
                name: 'articleRecycle',
                component: () => import(/** webpackChunkName: "article" */ 'views/article/recycle/index.vue'),
                meta: {
                    key: 'article.recycle',
                    breadcrumbName: '回收站',
                    depth: 2
                },
            },
        ]
    },
    {
        path: '/admin/resources',
        name: 'resources',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'resources',
            icon: 'file-search',
            breadcrumbName: '资源中心',
            depth: 1,
        },
        children: [
            {
                path: '/admin/resources/list',
                name: 'resourcesList',
                component: () => import(/** webpackChunkName: "page" */ 'views/resources/index.vue'),
                meta: {
                    key: 'resources.list',
                    breadcrumbName: '系统资源',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/admin',
        name: 'admins',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'admins',
            icon: 'team',
            breadcrumbName: '账号中心',
            depth: 1,
        },
        children: [
            {
                path: '/admin/admin/list',
                name: 'admin',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/index/index.vue'),
                meta: {
                    key: 'admin.index',
                    breadcrumbName: '管理员列表',
                    depth: 2,
                    hiddenChildren: true
                },
            },
            {
                path: '/admin/admin/edit',
                name: 'adminEdit',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/detail/index.vue'),
                meta: {
                    key: 'admin.index',
                    breadcrumbName: '编辑管理员',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/admin/add',
                name: 'adminAdd',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/detail/index.vue'),
                meta: {
                    key: 'admin.index',
                    breadcrumbName: '新增管理员',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/admin/role/list',
                name: 'adminRole',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/role/index/index.vue'),
                meta: {
                    key: 'admin.role',
                    breadcrumbName: '管理员角色',
                    depth: 2,
                    hiddenChildren: true
                },
            },
            {
                path: '/admin/admin/role/edit',
                name: 'roleEdit',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/role/detail/index.vue'),
                meta: {
                    key: 'admin.role',
                    breadcrumbName: '编辑管理员角色',
                    depth: 3,
                    hidden: true
                },
            },
            {
                path: '/admin/admin/role/add',
                name: 'roleAdd',
                component: () => import(/** webpackChunkName: "admin" */ 'views/admin/role/detail/index.vue'),
                meta: {
                    key: 'admin.role',
                    breadcrumbName: '新增管理员角色',
                    depth: 3,
                    hidden: true
                },
            },
        ]
    },
    {
        path: '/admin/user',
        name: 'users',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'users',
            icon: 'coffee',
            breadcrumbName: '个人设置',
            depth: 1,
        },
        children: [
            {
                path: '/admin/user/userinfo',
                name: 'information',
                component: () => import(/** webpackChunkName: "page" */ 'views/user/information/index.vue'),
                meta: {
                    key: 'user.information',
                    breadcrumbName: '修改资料',
                    depth: 2,
                },
            },
            {
                path: '/admin/user/changepass',
                name: 'changepass',
                component: () => import(/** webpackChunkName: "page" */ 'views/user/password/index.vue'),
                meta: {
                    key: 'user.changepass',
                    breadcrumbName: '修改密码',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/system',
        name: 'systems',
        component: () => import(/** webpackChunkName: "page" */ 'views/index/view.vue'),
        meta: {
            key: 'systems',
            icon: 'system',
            breadcrumbName: '系统设置',
            depth: 1,
        },
        children: [
            {
                path: '/admin/system/logs/operation',
                name: 'system.logs.operation',
                component: () => import(/** webpackChunkName: "page" */ 'views/system/logs/operation/index.vue'),
                meta: {
                    key: 'system.logs.operation',
                    breadcrumbName: '操作日志',
                    depth: 2,
                },
            },
            {
                path: '/admin/systemlog/logs/access',
                name: 'system.logs.access',
                component: () => import(/** webpackChunkName: "page" */ 'views/system/logs/access/index.vue'),
                meta: {
                    key: 'system.logs.access',
                    breadcrumbName: '访问日志',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/search',
        name: 'search',
        component: () => import(/** webpackChunkName: "page" */ 'views/search/index.vue'),
        meta: {
            key: 'search',
            icon: 'search',
            breadcrumbName: '搜索结果',
            depth: 1,
            hidden: true
        }
    },
];

export default viewRoutes;
