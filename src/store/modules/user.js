const state = {
    user: {
        avatar: '',
        nickname: ''
    }
}

const mutations = {
    UPDATE_USER({ state }, val) {
        state.user = val
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
