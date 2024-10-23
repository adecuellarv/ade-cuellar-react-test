import { configureStore } from '@reduxjs/toolkit';
import usersReducers from './reducers/usersReducer';
import productsReducers from './reducers/productsReducer';

const store = configureStore({
  reducer: {
    users: usersReducers,
    products: productsReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
