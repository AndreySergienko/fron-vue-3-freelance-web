import {$authHost, $host} from "./index"

export const deleteSale = async (id) => {
  const {data} = await $authHost.delete(`/sales/delete/${id}`)
  return data
}

export const getSales = async () => {
  const {data} = await $host.get('/sales/all')
  return data
}

export const createSale = async (title, price, items, type) => {
  const {data} = await $authHost.post('/sales/create', {title, price, items, type})
  return data
}
