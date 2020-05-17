const mutations = {
    setState (state, payload) { // 改变state
        let { field, value } = payload
        if (state[field] != undefined) { // 说明state中的属性存在
            state[field] = value
        }
    }
}

export default mutations