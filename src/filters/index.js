/**
 * 格式化时间（使用了 Moment.js，https://github.com/moment/moment）
 * @param  {Number} timestamp 时间戳
 * @param  {String} format    格式化类型
 * @return {String}
 */
export const formatDate = (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!timestamp) return
    return moment(Number(timestamp)).format(format)
}

/**
 * @param  {Number} val 天数
 * @param  {String} format    格式化类型
 * @return {String}
 */
export const plusTime = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!val) return moment().format(format)
    let day = 1000 * 60 * 60 * 24
    return moment(Date.now() + Number(day * val)).format(format)
}

/**
 * 状态筛选
 */

export const stateFilter = (val) => {
    let state = ''
    switch (val) {
        case 'BACK':
            state = '退卡'
            break
        case 'STOP':
            state = '停卡'
            break
        case 'NOMAL':
            state = '正常'
            break
        case 'LOSE_VALUE':
            state = '挂失'
            break
        case 'NO_EXESIT':
            state = '卡不存在'
            break
        default:
            state = '未知'
    }
    return state
}

/**
 * 判断微信是否绑定
 */

export const weixinBind = (val) => {
    return val ? '是' : '否'
}

/**
 * 判断会员是否生效
 */

export const availableFilter = (val) => {
    return val ? '有效' : '无效'
}

/**
 * 储值类型
 */

export const cardTypeFilter = (val, text) => {
    let state = ''
    switch (val) {
        case 'DATELINE':
            state = '期限卡'
            break
        case 'NUM':
            state = '次数卡'
            break
        case 'CASH':
            state = '金额卡'
            break
        default:
            state = text || '未知'
    }
    return state
}

/**
 * 支付方式
 */

export const payFilter = (val) => {
    let state = ''
    switch (val) {
        case 'CASH':
            state = '现金'
            break
        case 'CREDIT':
            state = '银行'
            break
        case 'WX':
            state = '微信'
            break
        case 'FREE':
            state = '赠送'
            break
        case 'CARD':
            state = '会员'
            break
        case 'TANSFER':
            state = '转帐'
            break
        case 'RECIEPT':
            state = '招待'
            break
        case 'ACCOUNT':
            state = '挂账'
            break
        case 'YDG_WX':
            state = '微信'
            break
        case 'YDG_ALIPAY':
            state = '支付宝'
            break
        default:
            state = '未知'
    }
    return state
}

/**
 * 结算方式
 */

export const clearingFilter = (val) => {
    let state = ''
    switch (val) {
        case 'CONSUME':
            state = '已消费'
            break
        case 'APPLY':
            state = '结算中'
            break
        case 'PAY':
            state = '已结算'
            break
        default:
            state = '未知'
    }
    return state
}

/**
 * 支付方式
 */

export const orderFilter = (val) => {
    let state = ''
    switch (val) {
        case 0:
            state = '已支付'
            break
        case 1:
            state = '未支付'
            break
        case 2:
            state = '已取消'
            break
        case 3:
            state = '已退单'
            break
        case 4:
            state = '现租场未支付'
            break
        default:
            state = '未知'
    }
    return state
}

/**
 * 来源
 */

export const sourceFilter = (val) => {
    let state = ''
    switch (val) {
        case 0:
            state = '场馆'
            break
        case 1:
            state = '微信'
            break
        default:
            state = '未知'
    }
    return state
}

/**
* 所属运动项目
*/

export const sportFilter = (val) => {
    let state = ''
    switch (val) {
        case 'badminton':
            state = '羽毛球'
            break
        case 'table_tennis':
            state = '乒乓球'
            break
        case 'basketball':
            state = '篮球'
            break
        case 'football':
            state = '足球'
            break
        case 'billiards':
            state = '台球'
            break
        case 'tennis':
            state = '网球'
            break
        case 'swim':
            state = '游泳'
            break
        case 'bodybuilding':
            state = '健身'
            break
        case 'ice_skating':
            state = '真冰溜冰'
            break
        case 'skiing':
            state = '滑雪'
            break
        case 'squash':
            state = '壁球'
            break
        case 'rock_climbing':
            state = '攀岩'
            break
        case 'bowling':
            state = '保龄球'
            break
        case 'volleyball':
            state = '排球'
            break
        case 'entertainment':
            state = '娱乐'
            break
        case 'other':
            state = '其他'
            break
        default:
            state = '未知'
    }
    return state
}

/**
* 消费方式
*/

export const consumeFilter = (val) => {
    let state = ''
    switch (val) {
        case 'NO':
            state = '无积分'
            break
        case 'CHARGE':
            state = '充值积分'
            break
        case 'CONSUME':
            state = '消费积分'
            break
        case 'CONSUME_CHARGE':
            state = '充值&消费积分'
            break
        default:
            state = '未知'
    }
    return state
}

/**
 * 延期计算方式
 */

export const putoffStyleFilter = (val) => {
    let state = ''
    switch (val) {
        case 'CHARGE_DAY':
            state = '充值日算起'
            break
        case 'CHARGE_LEFT_DAY':
            state = '充值日加剩余日算起'
            break
        default:
            state = '未知'
    }
    return state
}

/**
* 计费方式
*/

export const chargingFilter = (val) => {
    let state = ''
    switch (val) {
        case 'REAL_TIME':
            state = '实际消费分钟'
            break
        case 'HALF_HOUR_TIME':
            state = '半小时'
            break
        case 'ONE_HOUR_TIME':
            state = '一小时'
            break
        default:
            state = '未知'
    }
    return state
}
