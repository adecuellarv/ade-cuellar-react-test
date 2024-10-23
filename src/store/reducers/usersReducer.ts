import { Reducer } from 'redux'
import { User } from '../../models';

interface UsersState {
  list: User[]
}

const initialState: UsersState = {
  list: []
}

const usersReducer: Reducer<UsersState> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, list: [...state.list, action.payload] }
    case 'DELETE_USER':
      return {
        ...state,
        list: state.list.filter(user => user.id !== action.payload.id)
      }
    case 'UPDATE_USER':
      return {
        ...state,
        list: state.list.map(user =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.updates }
            : user
        )
      }
    default:
      return state
  }
}

export default usersReducer
