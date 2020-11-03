import viewRoutes from './views'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import(/** webpackChunkName: "base" */ 'views/login/index.vue'),
		meta: {
			breadcrumbName: '登陆',
			depth: 1,
		},
		beforeEnter: (to, from ,next) => {
			next(!sessionStorage.getItem('token'));
		}
	},
	{
		path: '/admin/index',
		name: 'adminIndex',
        component: () => import(/** webpackChunkName: "base" */ 'views/index/index.vue'),
		alias: '/',
		meta: {
            breadcrumbName: '首页', // 首页
			depth: 0,
		},
		children: [...viewRoutes],
	},
	{
        path: '/:pathMatch(.*)*',
		name: 'notFound',
        component: () => import(/** webpackChunkName: "base" */ 'components/Exception/404.vue'),
		meta: {
			breadcrumbName: '404',
			depth: 1,
		}
	}
]

export default routes;
