import {$authHost, $host} from "./index"

export const csrfAuth = async () => {
  await $host.get('/')
}

export const loginPassword = async (email, password) => {
  const {data} = await $host.post('/user/login', {email, password})
  return data
}

export const permissionLoginCode = async () => {
  const {data} = await $host.get('/user/login/code-valid')
  return data
}

export const loginCode = async (email, code) => {
  const {data} = await $host.post('/user/login/code', {email, code})
  return data
}

export const logout = async () => {
  await $host.post('/user/logout')
}

export const reset = async (email) => {
  const {data} = await $host.post('/user/reset',{email})
  return data
}

export const savePassword = async (email, password) => {
  const {data} = await $host.post('/user/reset/save',{email, password})
  return data
}

export const refresh = async () => {
  const {data} = await $host.get('/user/refresh')
  return data
}

export const permissionResetPassword = async () => {
  const {data} = await $host.get('/user/check-reset/:link')
  return data
}

export const changeCurrentPassword = async (email, currentPassword, newPassword) => {
  const {data} = await $authHost.post('/user/auth/change-pass', {email, currentPassword, newPassword})
  return data
}

export const deleteAllTokens = async (email) => {
  const {data} = await $authHost.post('/user/auth/delete-tokens', {email})
  return data
}
