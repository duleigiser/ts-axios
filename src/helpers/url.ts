import {isDate, isPlainObject} from './util'
function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  if(!params) return url

  const parts: string[] = []

  Object.keys(params).forEach((key)=> {
    let val = params[key]
    if(val === null || typeof val === 'undefined') { // 空值忽略
      return
    }
    let values: string[] = []
    if(Array.isArray(val)) { // 参数为数组的时候
      values = val
      key+='[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if(isDate(val)) { // 参数为date
        val = val.toISOString()
      } else if(isPlainObject(val)) { // 参数为对象的
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    });
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if(markIndex !== -1 ) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}