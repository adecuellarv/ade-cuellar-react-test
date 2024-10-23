import { configureStore } from '@reduxjs/toolkit';
import usersReducers from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    users: usersReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
