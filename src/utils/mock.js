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


let chinesData = [
    {
        name: '布洛芬缓释混悬液（中方）',
        id: 'c1'
    },
    {
        name: '四环素片（中方）',
        id: 'c2'
    },
    {
        name: '甲硝唑片（中方）',
        id: 'c3'
    },
    {
        name: '阿莫西林（中方）',
        id: 'c4'
    },
    {
        name: '999感冒药（中方）',
        id: 'c5'
    },
    {
        name: '后悔药（中方）',
        id: 'c6'
    },
    {
        name: '王者农药（中方）',
        id: 'c7'
    },
    {
        name: '夏枯草膏（中方）',
        id: 'c8'
    },
    {
        name: '板蓝根（中方）',
        id: 'c9'
    },
    {
        name: '健胃消食片 （中方）',
        id: 'c10'
    }
]

let westData = [
    {
        name: '布洛芬缓释混悬液（西方）',
        id: 'w1'
    },
    {
        name: '四环素片（西方）',
        id: 'w2'
    },
    {
        name: '甲硝唑片（西方）',
        id: 'w3'
    },
    {
        name: '阿莫西林（西方）',
        id: 'w4'
    },
    {
        name: '999感冒药（西方）',
        id: 'w5'
    },
    {
        name: '后悔药（西方）',
        id: 'w6'
    },
    {
        name: '王者农药（西方）',
        id: 'w7'
    },
    {
        name: '夏枯草膏（西方）',
        id: 'w8'
    },
    {
        name: '板蓝根（西方）',
        id: 'w9'
    },
    {
        name: '健胃消食片 （西方）',
        id: 'w10'
    }
]

// 请求药品名称接口
Mock.mock(`${baseUrl}/getDrugs`, 'post', function(request) {
    let result = {
        code: '0',
        status: '200',
        data: []
    }
    let { type, keyWord } = JSON.parse(request.body)
    if (type == '1') {
        let data = []
        chinesData.forEach((item) => {
            if (item.name.includes(keyWord)) {
                data.push(item)
            }
        })
        result.data = data
    } else if (type == '2') {
        let data = []
        westData.forEach((item) => {
            if (item.name.includes(keyWord)) {
                data.push(item)
            }
        })
        result.data = data
    } else {
        result.code = '8564'
        result.msg = '请求的药品类型不存在'
    }
    // console.log(result, '请求成功')
    return result
});