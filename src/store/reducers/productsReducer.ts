import { Reducer } from 'redux'
import { Product } from '../../models'

interface ProductState {
  list: Product[]
}

const initialState: ProductState = {
  list: []
}

const productsReducer: Reducer<ProductState> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, list: action.payload }
    case 'ADD_PRODUCT':
      return { ...state, list: [...state.list, action.payload] }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        list: state.list.filter(product => product.id !== action.payload.id)
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        list: state.list.map(product =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.updates }
            : product
        )
      }
    default:
      return state
  }
}

export default productsReducer
