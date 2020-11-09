import { getAdminDetail } from '@/api/admin'

const state = {
    user: JSON.parse(sessionStorage.getItem('user')) ?? {}
}

const mutations = {
    UPDATE_USER(state, { data: { id, avatar, nickname, phone, email, role_id, intro } }) {
        state.user = { id, avatar, nickname, phone, email, role_id, intro }
        sessionStorage.setItem('user', JSON.stringify(state.user))
    }
}

const actions = {
    async UPDATE_USER({ commit }, params) {
        commit('UPDATE_USER', await getAdminDetail(params))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
