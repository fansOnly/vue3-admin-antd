import store from '@/store'

const AUTH_LIST = ['admin', 'super', 'test']
const { MENU_AUTH_LIST, OPERATE_AUTH_LIST } = store.state.authority

const checkAuth = (authList, authValue) => {
    return authList.includes(authValue)
}

// eslint-disable-next-line no-unused-vars
function install(Vue, options = {}) {
    Vue.directive('auth', {
        mounted(el, binding) {
            if (!checkAuth(AUTH_LIST, binding.value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })
    Vue.directive('menu-auth', {
        mounted(el, binding) {
            if (!checkAuth(MENU_AUTH_LIST, binding.value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })
    Vue.directive('operate-auth', {
        mounted(el, binding) {
            if (!checkAuth(OPERATE_AUTH_LIST, binding.value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })
}

export default { install }
