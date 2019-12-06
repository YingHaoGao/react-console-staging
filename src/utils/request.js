import { history } from './router'
import axios from '@uyun/utils/request'
import { notification } from '@uyun/components'

const request = axios.create({
  baseURL: '/boss',
  history
})

/**
 * 响应拦截
 */
request.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) return response.data
    notification.error({
      message: `请求错误 ${response.status}: ${response.config.url}`,
      description: response.statusText
    })

    const error = new Error(response.statusText)

    error.response = response

    throw error
  },
  error => {
    console.log(error)
    if (axios.isCancel(error)) return Promise.reject(error)
    if (error.code) {
      notification.error({
        message: error.name,
        description: error.message
      })
    } else if ('stack' in error && 'message' in error) {
      notification.error({
        description: error.message
      })
    }
    return Promise.reject(error)
  }
)

export default request
