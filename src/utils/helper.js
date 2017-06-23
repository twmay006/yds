// 判断对象是否有空值.有就去掉,都为空返回false
export const isEmptyObject = (options, query = []) => {
    if (!options) return false
    let result = {}
    Object.keys(options).forEach(k => {
        if (options[k] && !query.find((n) => n === k)) {
            result[k] = options[k]
        }
    })
    if (!Object.keys(result).length) return false
    return result
}

// 序列化对象
export const serialize = data => {
    let arr = []
    Object.keys(data).forEach(k => {
        arr.push(`${ k }=${ data[k] }`)
    })
    return arr.join('&')
}

// 获取某个url参数
export const getQueryString = name => {
    let reg = new RegExp(`(^|&)${ name }=([^&]*)(&|$)`, 'i'),
        r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

// 获取url后面全部参数
export const GetRequest = () => {
    let url = location.search,
        theRequest = {},
        str,
        strs
    if (url.indexOf('?') !== -1) {
        str = url.substr(1)
        strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
        }
    }
    return theRequest
}

// 绑定filter参数到url上
export const bindFilter = data => {
    let result = isEmptyObject(data),
        query = Object.assign({}, !result ? {} : result)
    query.page ? delete query.page : ''
    router.push({ query: query })
}

// 转换数字字符串
export const strToNum = (options, value) => {
    Object.keys(options).forEach(k => {
        if (value) {
            if (value.indexOf(k) > -1) {
                options[k] = Number(options[k])
            }
        }
        else {
            let n = Number(options[k])
            if (!isNaN(n)) {
                options[k] = n
            }
        }
    })
    return options
}

// 合并
export const merge = options => {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {}
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop]
                if (value !== undefined) {
                    options[prop] = value
                }
            }
        }
    }
    return options
}

// 获取dom
export const $ = dom => {
    return document.getElementsByClassName(dom)
}
