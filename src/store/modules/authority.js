import { getAuthorityList } from '@/api/common'

const state = {
    MENU_AUTH_LIST: localStorage.getItem('MENU_AUTH_LIST') || [],
    OPERATE_AUTH_LIST: localStorage.getItem('OPERATE_AUTH_LIST') || []
}

const mutations = {
    SET_AUTH(state, { MENU_AUTH_LIST, OPERATE_AUTH_LIST }) {
        state.MENU_AUTH_LIST = MENU_AUTH_LIST
        state.OPERATE_AUTH_LIST = OPERATE_AUTH_LIST
        localStorage.setItem('MENU_AUTH_LIST', MENU_AUTH_LIST)
        localStorage.setItem('OPERATE_AUTH_LIST', OPERATE_AUTH_LIST)
    }
}

const actions = {
    async SET_AUTH({ commit }) {
        commit('SET_AUTH', await getAuthorityList())
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
