import axios from './axios'

export const getProducts = async () => {
  return await axios.get('')
}

export const getProduct = async (id: any) => {
  return await axios.get(id)
}

export const postProduct = async (data: any) => {
  return await axios.post(data)
}

export const putProduct = async (data: any) => {
  return await axios.put(data)
}
