import axios from 'axios'

import qs from 'qs' // post form表单提交. 数据格式化

import handleApiErr from './handleApiErr'

const base = '/clubmanager/sys'

// 开启 history 模式, 则可以去掉注释...
let state = ''

// http request 拦截器
axios.interceptors.request.use(
    config => {
        NProgress.start()
        state = history.state
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done()
        // 页面跳转不再执行当前的异步回调函数
        if (state && history.state.key !== state.key) return
        return handleApiErr(response)
    },
    error => {
        if (error.response) {
            NProgress.done()
            // 同上
            if (state && history.state.key !== state.key) return
            return handleApiErr(error.response)
        }
    })

// 登录
export const login = params => {
    return axios.post(`${ base }/login`, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res)
}

// 退出
export const logout = params => {
    return axios.get(`${ base }/logout`, params).then(res => res)
}

// 修改密码
export const changePwd = params => {
    return axios.post(`${ base }/user/changePassword`, params).then(res => res)
}

// 获取七牛token
export const getToken = params => {
    return axios.get(`${ base }/qiniu/token`, { params: params }).then(res => res)
}

// 接口列表
export const apiList = {
    // 选中某一个方法名
    selectApi: params => {
        let str = params.method === 'get' ? 'params' : 'data'
        return axios({ method: params.method, url: `${ base }/${ params.url }`, [str]: params.options }).then(res => res)
    },

    // 重构web, api都放到这个块里, 别弄乱了-------------------------------

    // 场地类型
    siteTypeConfigList: params => {
        return axios.get(`${ base }/courttype/all`, { params: params }).then(res => res)
    },

    // 票券项目设置
    ticketItemConfigList: params => {
        return axios.get(`${ base }/ticketitem/all`, { params: params }).then(res => res)
    },

    // 超时方案设置
    timeOutList: params => {
        return axios.get(`${ base }/timeoutSchema/all`, { params: params }).then(res => res)
    },

    // 会员信息管理
    memberList: params => {
        return axios.get(`${ base }/member/new`, { params: params }).then(res => res)
    },

    // 删除会员
    memberDelete: params => {
        return axios.delete(`${ base }/member/${ params.id }`).then(res => res)
    },

    // 获取会员名字
    member: params => {
        return axios.get(`${ base }/member/same`, { params: params }).then(res => res)
    },

    // 会员卡类型列表
    memCardTypeList: params => {
        return axios.get(`${ base }/memCardType`, { params: params }).then(res => res)
    },

    // 场地信息维护
    siteMaintenance: params => {
        return axios.get(`${ base }/court/conditon/${ params.id }`).then(res => res)
    },

    // 场地信息维护删除
    siteMaintenanceDelete: params => {
        return axios.delete(`${ base }/court/${ params.id }`).then(res => res)
    },

    // 场地信息维护新增
    siteMaintenanceAdd: params => {
        return axios.post(`${ base }/court/`, params).then(res => res)
    },

    // 删除场地
    siteTypeConfigDelete: params => {
        return axios.delete(`${ base }/courttype/${ params.id }`).then(res => res)
    },

    // 价格方案设置
    priceProjectList: params => {
        return axios.get(`${ base }/priceProject/${ params.id }`).then(res => res)
    },

    // 灯控设置
    lightCourtSetList: params => {
        return axios.get(`${ base }/lightCourtSet/select/${ params.id }/`).then(res => res)
    },

    // 全部灯控
    lightAutoAll: params => {
        return axios.get(`${ base }/lightAuto/all/`).then(res => res)
    },

    // 通过物理卡号获取卡号
    getCodeMacBymcCode: params => {
        return axios.get(`${ base }/memCard/getCodeMacBymcCode`, { params: params }).then(res => res)
    },

    // 获取卡类型
    getValueType: params => {
        return axios.get(`${ base }/memCardType/valueType`, { params: params }).then(res => res)
    },

    // 获取销售人员列表
    getsalemanList: params => {
        return axios.get(`${ base }/user/getsalemanList`, { params: params }).then(res => res)
    },

    // 获取仓库
    getWareHouse: params => {
        return axios.get(`${ base }/warehouseSet/getAll`, { params: params }).then(res => res)
    },

    // end------------------------------

    // 场馆列表
    clubList: params => {
        return axios.get(`${ base }/club/cityId`, { params: params }).then(res => res)
    },

    // 场馆列表, 不带分页的.
    club: params => {
        return axios.get(`/clubmanager/wxChain/club/all`, { params: params }).then(res => res)
    },

    // 判断是不是总馆
    isMasterClub: params => {
        return axios.get(`${ base }/unionClub/isMasterClub`, { params: params }).then(res => res)
    },

    // 场馆所在城市列表
    clubAddress: params => {
        return axios.get(`${ base }/address/citys`, { params: params }).then(res => res)
    },

    // 场馆对账
    reconciliation: params => {
        return axios.get(`${ base }/accountBill/findOtherPayments`, { params: params }).then(res => res)
    },

    // 场馆名称列表
    findClubByName: params => {
        return axios.get(`${ base }/accountBill/findClubByName`, { params: params }).then(res => res)
    },

    // 场馆收入汇总
    getIncome: params => {
        return axios.get(`${ base }/operatingIncome/getListMonth`, { params: params }).then(res => res)
    },

    // 账单详情
    reconciliationDetail: params => {
        return axios.get(`${ base }/accountBill/club/consumeDetail`, { params: params }).then(res => res)
    },

    // 场地类型
    getCourttype: params => {
        return axios.get(`${ base }/courttype/allCourt`, { params: params }).then(res => res)
    },

    // 会员信息报表
    getMemberInfo: params => {
        return axios.get(`${ base }/member/memberInfo`, { params: params }).then(res => res)
    },

    // 会员办卡
    getMemberMonthInfo: params => {
        return axios.get(`${ base }/member/memberMonthInfo`, { params: params }).then(res => res)
    },

    // 保存代理商
    agentSave: params => {
        return axios.post(`${ base }/bsAgent/?account=${ params.account }`, params).then(res => res)
    },

    // 场馆各种状态
    getClubConstant: params => {
        return axios.get(`${ base }/clubConstant`, { params: params }).then(res => res)
    },

    // 获取用户列表
    getUser: params => {
        return axios.get(`${ base }/user`, { params: params }).then(res => res)
    },

    // 获取卡类型
    getCard: params => {
        return axios.get(`${ base }/memCardType/all`, { params: params }).then(res => res)
    },

    // 分项目收入
    getPayStyleCostOfDay: params => {
        return axios.get(`${ base }/report/getPayStyleCostOfDay`, { params: params }).then(res => res)
    },

    // 会员操作明细
    getOperateLog: params => {
        return axios.get(`${ base }/memrecord/operateLog`, { params: params }).then(res => res)
    },

    // 统计会员消费数据
    insertConsumeInfo: params => {
        return axios.get(`${ base }/member/insertConsumeInfo`, { params: params }).then(res => res)
    }

    // api_1: params => {
    //     return axios.get(`${ base }/member/dealRegisterInfo`, { params: params })
    // },

    // api_2: params => {
    //     return axios.get(`${ base }/user/getsalemanList`, { params: params })
    // },

    // // 同时发起多个请求,并发处理.
    // moreApi: params => {
    //     let urls = ['api_1/post', 'api_2/get'],
    //         requests = urls.map(makeRequest)
    //     return axios.all(requests).then(axios.spread(res => res))
    // }
}

// 把指定的 url 转变成 axios 请求，返回的是 Promise 对象
// function makeRequest(api) {
//     let url = api.split('/')
//     if (url[1] === 'get') return axios.get(url[0])
//     return axios.post(url[0])
// }
