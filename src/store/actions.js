import mystorage from '../utils/storage'
import httpService from '../utils/httpService'
const actions = {
     // 初始化履职员工页面数据状态
    async initPerformStaffPage ({commit }) {
        try {
            if (!mystorage.get('staffList')) { // 设置在storage中，避免刷新页面就会重置数据。
                let result = await httpService({ url: '/list', type: 'get'})
                mystorage.set('staffList', result.data)
                commit("setState", { field: 'staffListTable', value: result.data }) // 提交mutations，去改变staet
            } else {
                let data = mystorage.get('staffList')
                commit("setState", { field: 'staffListTable', value: data }) // 提交mutations，去改变staet
            }
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default actions