import {$authHost} from "./index"

export const createLetter = async (info) => {
  const {data} = await $authHost.post('/letter/create', {title: info.title, subtitle: info.subtitle, text: info.text})
  return data
}
