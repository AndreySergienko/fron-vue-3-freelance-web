import {$authHost, $host} from "./index"

export const getCategory = async () => {
  const {data} = await $host.get('/webinars/category')
  return data
}

export const createCategory = async (category) => {
  const {data} = await $authHost.post('/webinars/create', {category})
  return data
}

export const deleteCategory = async (id) => {
  const {data} = await $authHost.post('/webinars/delete', {id})
  return data
}

export const webinarCreate = async (formData) => {
  const {data} = await $authHost.post('/webinars/create-doc', formData)
  return data
}

export const getWebinars = async () => {
  const {data} = await $host.get('/webinars/all')
  return data
}

export const changeWebinar = async (formData) => {
  const {data} = await $authHost.put('/webinars/change', formData)
  return data
}

export const deleteWebinar = async (id) => {
  const {data} = await $authHost.delete(`/webinars/delete/${id}`)
  return data
}
