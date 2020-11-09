import { createRouter, createWebHashHistory } from 'vue-router'
import { Modal } from 'ant-design-vue'

import NProgress from 'nprogress'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    // console.log('beforeEach global', to, from);
    if (to.path !== from.path) {
        NProgress.start();
    }

    // 路由登录验证
    if (/^\/admin\/\S+/.test(to.path) || to.path === '/') {
        if (!sessionStorage.getItem('token')) {
            let timeout = 5;
            const modal = Modal.warning({
                title: '会话过期，请重新登陆',
                content: `当前窗口 ${timeout} 秒后自动关闭`,
                okText: '确定',
                zIndex: 9999,
                onOk() {
                    clearInterval(interval);
                    next({
                        path: '/login',
                        query: {
                            redirect: encodeURIComponent(to.fullPath)
                        }
                    })
                }
            });
            const interval = setInterval(() => {
                timeout -= 1;
                modal.update({
                    content: `当前窗口 ${timeout} 秒后自动关闭`,
                });
                if (timeout == 0) {
                    clearInterval(interval);
                    modal.destroy();
                    next({
                        path: '/login',
                        query: {
                            redirect: to.fullPath
                        }
                    })
                }
            }, 1000);
        } else {
            next()
        }
    } else {
        next();
    }
})

router.afterEach(() => {
    NProgress.done();
    document.documentElement.scrollTop = 0;
})

export default router;
