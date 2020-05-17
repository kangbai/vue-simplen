import vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions
})