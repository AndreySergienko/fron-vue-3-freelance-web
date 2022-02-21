import {refresh} from "./userApi"
const axios = require("axios")
import store from '../store'

import TokenService from "../services/token-service"

const $host = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_SERVER_URL,
})

const $authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_SERVER_URL,
})

$host.interceptors.request.use((config) => {
  config.headers['xsrf-token'] = TokenService.csrfToken
  return config
})

// $host.interceptors.response.use((config) => {
//   TokenService.csrfToken = config.headers['xsrf-token']
//   return config
// },
//   (config) => {
//   console.log('test')
//     TokenService.csrfToken = config.headers['xsrf-token']
//     return config
//   })

$host.interceptors.response.use(
  (config) => {
    TokenService.csrfToken = config.headers['xsrf-token']
    return config
  },
  async (error) => {
    TokenService.csrfToken = error.response.headers['xsrf-token']
    return Promise.reject(error)
  }
)


$authHost.interceptors.request.use((config) => {
  config.headers['xsrf-token'] = TokenService.csrfToken
  config.headers.Authorization = `Bearer ${TokenService.accessToken}`
  return config
})

$authHost.interceptors.response.use(
  (config) => {
    TokenService.csrfToken = config.headers['xsrf-token']
    return config
  },
  async (error) => {
    console.log(error)
    TokenService.csrfToken = error.response.headers['xsrf-token']
    const originalRequest = error.config
    if (error.response.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const data = await refresh()
        TokenService.accessToken = data.accessToken
        return $authHost.request(originalRequest)
      } catch (e) {
        await store.dispatch('auth/logout')
      }
    }
    throw error
  }
)

export {
  $host,
  $authHost
}
