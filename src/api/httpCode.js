/**
 * 引入单个弹窗组件
 */

import { Message } from 'element-ui'

/**
 * 弹窗提示
 */

const toast = (msg = '操作失败:front') => {
    Message({
        showClose: true,
        message: msg,
        duration: 3000,
        type: 'error'
    })
}

/**
    http请求 状态码对应信息
    next: Boolean 默认值true 是否将原数据带下去
    do: Function 获取数据后的第一手操作
*/

export default {
    1: {
        next: false,
        do: rs => {
            toast(rs.msg)
        }
    },
    404: {
        next: false,
        do: rs => {
            toast('未找到接口, 404错误')
        }
    },
    405: {
        next: false,
        do: rs => {
            toast('传参错误, 405错误')
        }
    },
    415: {
        next: false,
        do: rs => {
            toast('接口参数不能为空')
        }
    },
    500: {
        next: false,
        do: rs => {
            toast('server error, 稍后再试')
        }
    },
    502: {
        next: false,
        do: rs => {
            toast('bad Gateway, 稍后再试')
        }
    },
    503: {
        next: false,
        do: rs => {
            toast('Service Unavailable, 稍后再试')
        }
    },
    504: {
        next: false,
        do: rs => {
            toast('Gateway Timeout, 稍后再试')
        }
    },
    40003: {
        next: false,
        do: rs => {
            toast(rs.msg)
            router.push({ path: '/' })
        }
    },
    401: {
        next: false,
        do: rs => {
            localStorage.removeItem('username')
            localStorage.removeItem('permission')
            router.push({ path: '/login', query: { redirect: location.pathname } })
        }
    }
}
