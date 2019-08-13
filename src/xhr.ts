import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  const {data = null, url, method = 'get', headers} = config
  const request = new XMLHttpRequest()

  request.open(method.toLowerCase(), url, true)
  Object.keys(headers).forEach((name) => {
    // 如果data 为空 设置content-type 没有用，所以删除
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
