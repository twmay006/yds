export default {
    // common
    abstract: resolve => require(['@/pages/common/abstract'], resolve),

    // 场馆管理
    clubList: resolve => require(['../pages/modules/club/clubList'], resolve),
    clubAdd: resolve => require(['../pages/modules/club/clubAdd'], resolve),

    // 财务报表
    CenterReport: resolve => require(['../pages/modules/report/CenterReport'], resolve),
    reconciliationDetail: resolve => require(['../pages/modules/report/reconciliationDetail'], resolve),
    reconciliation: resolve => require(['../pages/modules/report/reconciliation'], resolve),

    // 资源配置
    resource: resolve => require(['../pages/modules/admin/resource'], resolve)
}
