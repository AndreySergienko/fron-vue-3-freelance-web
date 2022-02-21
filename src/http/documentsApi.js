import {$authHost, $host} from "./index"

export const getCategory = async () => {
  const {data} = await $host.get('/documents/category')
  return data
}

export const createCategory = async (category) => {
  const {data} = await $authHost.post('/documents/create', {category})
  return data
}

export const deleteCategory = async (id) => {
  const {data} = await $authHost.post('/documents/delete', {id})
  return data
}

export const documentCreate = async (formData) => {
  const {data} = await $authHost.post('/documents/create-doc', formData)
  return data
}

export const getDocuments = async () => {
  const {data} = await $host.get('/documents/all')
  return data
}

export const changeDocument = async (formData) => {
  const {data} = await $authHost.put('/documents/change', formData)
  return data
}

export const deleteDocument = async (id) => {
  const {data} = await $authHost.delete(`/documents/delete/${id}`)
  return data
}
