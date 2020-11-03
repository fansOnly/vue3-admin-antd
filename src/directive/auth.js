const AUTH_LIST = ['admin', 'super', 'test']

const checkAuth = auths => {
    return AUTH_LIST.some(v => auths.includes(v))
}

function install(Vue, options = {}) {
    Vue.directive('auth', {
        mounted(el, binding) {
            if (!checkAuth(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })
}

export default { install }
