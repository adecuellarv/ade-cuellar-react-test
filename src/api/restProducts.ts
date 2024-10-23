import axios from './axios'

export const getProducts = async () => {
  const resp = await axios.get('?limit=5')
  return resp
}
