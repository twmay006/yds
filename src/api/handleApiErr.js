import httpCode from './httpCode'
/**
* 处理promise, 针对httpCode状态码,处理不同的错误.
*/

export default res => {
    let prev = httpCode[res.status === 200 ? res.data.code : res.status]
    if (!prev) return res.data
    prev.do && prev.do(res.data)
    if (prev.next !== false) return res.data
}

