/**
 * @fileDescription Mock数据模拟
 */

 // 首先引入Mock
const Mock = require('mockjs');
let { origin: baseUrl } = location // 定位全局的请求前缀
// 设置拦截请求的相应时间
Mock.setup({
  timeout: '200-600'
});

// 自定义扩展
Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ['132', '135', '189', '166', '189', '136', '177']
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    },
    jobNumber: function () {
        let jobNumberPrefixs = ['HY0', 'HY1', 'HY2', 'HY3']
        return this.pick(jobNumberPrefixs) + Mock.mock(/\d{3}/) //Number()
    }
})

Mock.mock(`${baseUrl}/list`, 'get', function() {
    return Mock.mock({
        "status": "200",
        "msg": "success",
        "data|150-300": [{
            'name': '@cname',
            'id': '@guid',
            'sex|1': ['男', '女'],
            'fromCity': '@city(true)', 
            'age|20-33': 23,
            'phoneNumber': '@phone',
            'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师', '架构师', '运维工程师'],
            'jobNumber': '@jobNumber'
        }
      ]
    });
});

Mock.mock(`${baseUrl}/roleList`, 'get', function() {
    return Mock.mock(
        () => {
            return [ {name: '系统管理员'} ]
        }
    );
});
