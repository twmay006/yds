import abstract from '@/pages/common/abstract'

let routes = [
    {
        path: '/base',
        name: '基础资料',
        iconClass: 'el-icon-menu',
        component: abstract,
        children: [
            {
                path: '/base/siteTypeConfig',
                name: '场地类型设置',
                component: resolve => require(['@/pages/modules/base/siteTypeConfig'], resolve),
                alias: '/index'
            },
            {
                path: '/base/siteInfoMaintenance/:id',
                name: '场地信息维护',
                hidden: true,
                component: resolve => require(['@/pages/modules/base/siteInfoMaintenance'], resolve)
            },
            {
                path: '/base/ticketItemConfig',
                name: '票券项目设置',
                component: resolve => require(['@/pages/modules/base/ticketItemConfig'], resolve)
            },
            {
                path: '/base/ticketItemDetail/:id',
                name: '票券明细',
                hidden: true,
                component: resolve => require(['@/pages/modules/base/ticketItemDetail'], resolve)
            },
            {
                path: '/base/priceConfig/:id',
                name: '价格方案设置',
                hidden: true,
                component: resolve => require(['@/pages/modules/base/priceConfig'], resolve)
            },
            {
                path: '/base/lightControl/:id',
                name: '灯控设置',
                hidden: true,
                component: resolve => require(['@/pages/modules/base/lightControl'], resolve)
            },
            {
                path: '/base/holidayConcig',
                name: '节假日设置',
                component: resolve => require(['@/pages/modules/base/holidayConcig'], resolve)
            },
            {
                path: '/base/durationConfig',
                name: '时间间隔设置',
                component: resolve => require(['@/pages/modules/base/durationConfig'], resolve)
            }
        ]
    },
    {
        path: '/business',
        name: '营业前台',
        iconClass: 'el-icon-menu',
        component: abstract,
        children: [
            {
                path: '/business/SiteManagement',
                name: '场地管理',
                component: resolve => require(['@/pages/modules/business/SiteManagement'], resolve)
            },
            {
                path: '/business/ticketSales',
                name: '票券销售',
                component: resolve => require(['@/pages/modules/business/ticketSales'], resolve)
            },
            {
                path: '/business/commoditySales',
                name: '商品销售',
                component: resolve => require(['@/pages/modules/business/commoditySales'], resolve)
            },
            {
                path: '/business/billManagement',
                name: '账单管理',
                component: resolve => require(['@/pages/modules/report/billQuery'], resolve)
            }
        ]
    },
    {
        path: '/member',
        name: '会员管理',
        iconClass: 'el-icon-menu',
        component: abstract,
        children: [
            {
                path: '/member/infoManager',
                name: '会员信息管理',
                component: resolve => require(['@/pages/modules/member/infoManager'], resolve),
                alias: '/index'
            },
            {
                path: '/member/add',
                name: '新增会员',
                meta: {
                    deep: true
                },
                hidden: true,
                component: resolve => require(['@/pages/modules/member/add'], resolve)
            },
            {
                path: '/member/cardManager',
                name: '会员卡类型管理',
                component: resolve => require(['@/pages/modules/member/cardManager'], resolve)
            },
            {
                path: '/member/commonOperation',
                name: '会员常用操作',
                component: resolve => require(['@/pages/modules/member/commonOperation'], resolve)
            }
        ]
    },
    {
        path: '/club',
        name: '场馆管理',
        iconClass: 'el-icon-menu',
        component: abstract,
        children: [
            {
                path: '/club/clubList',
                name: '场馆列表',
                meta: {
                    access: ['add']
                },
                component: resolve => require(['@/pages/modules/club/clubList'], resolve),
                alias: '/index'
            },
            {
                path: '/club/clubAdd',
                name: '新建场馆',
                meta: {
                    deep: true
                },
                hidden: true,
                component: resolve => require(['@/pages/modules/club/clubAdd'], resolve)
            }
        ]
    },
    {
        path: '/report',
        name: '财务报表',
        iconClass: 'el-icon-edit',
        component: abstract,
        children: [
            {
                path: '/report/reconciliation',
                meta: {
                    deep: true,
                    type: 'finance'
                },
                hidden: true,
                name: '场馆对账',
                component: resolve => require(['@/pages/modules/report/reconciliation'], resolve)
            },
            {
                path: '/report/CenterReport',
                name: '管理中心报表',
                component: resolve => require(['@/pages/modules/report/CenterReport'], resolve)
            },
            {
                path: '/report/reconciliationDetail',
                meta: {
                    deep: true
                },
                hidden: true,
                name: '账单明细',
                component: resolve => require(['@/pages/modules/report/reconciliationDetail'], resolve)
            },
            {
                path: '/report/incomeDetail',
                meta: {
                    deep: true,
                    type: 'business'
                },
                hidden: true,
                name: '分项目收入汇总',
                component: resolve => require(['@/pages/modules/report/incomeDetail'], resolve)
            },
            {
                path: '/report/billQuery',
                meta: {
                    deep: true,
                    type: 'finance'
                },
                hidden: true,
                name: '账单查询',
                component: resolve => require(['@/pages/modules/report/billQuery'], resolve)
            },
            {
                path: '/report/thirdParty',
                meta: {
                    deep: true,
                    type: 'finance'
                },
                hidden: true,
                name: '第三方支付结算报表',
                component: resolve => require(['@/pages/modules/report/thirdParty'], resolve)
            },
            {
                path: '/report/memberOperation',
                meta: {
                    deep: true,
                    type: 'member'
                },
                hidden: true,
                name: '会员操作明细报表',
                component: resolve => require(['@/pages/modules/report/memberOperation'], resolve)
            },
            {
                path: '/report/memberSituation',
                meta: {
                    deep: true,
                    type: 'member'
                },
                hidden: true,
                name: '会员信息情况分析',
                component: resolve => require(['@/pages/modules/report/memberSituation'], resolve)
            },
            {
                path: '/report/memberChange',
                meta: {
                    deep: true,
                    type: 'member'
                },
                hidden: true,
                name: '会员业务办理汇总表',
                component: resolve => require(['@/pages/modules/report/memberChange'], resolve)
            },
            {
                path: '/report/methodPayment',
                meta: {
                    deep: true,
                    type: 'business'
                },
                hidden: true,
                name: '分支付方式收入汇总',
                component: resolve => require(['@/pages/modules/report/methodPayment'], resolve)
            }
        ]
    },
    {
        path: '/config',
        name: '系统设置',
        iconClass: 'el-icon-setting',
        component: abstract,
        children: [
            {
                path: '/config/resources',
                name: '资源管理',
                component: resolve => require(['@/pages/modules/admin/resource'], resolve)
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        hidden: true,
        meta: {
            auth: true
        },
        component: resolve => require(['@/pages/common/login'], resolve)
    },
    {
        path: '/404',
        name: '404',
        hidden: true,
        meta: {
            auth: true
        },
        component: resolve => require(['@/pages/common/404'], resolve)
    },
    {
        path: '/403',
        name: '403',
        hidden: true,
        meta: {
            auth: true
        },
        component: resolve => require(['@/pages/common/403'], resolve)
    },
    {
        path: '/',
        hidden: true,
        redirect: '/index'
    },
    {
        path: '*',
        hidden: true,
        redirect: '/404'
    }
]

export default routes
