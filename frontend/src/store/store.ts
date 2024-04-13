import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { useDispatch } from 'react-redux';
import LoginReducer, { initializeLogin, persistLoginMiddleware } from 'store/reducers/login';

export const mainStore: ToolkitStore = configureStore({
  reducer: {
    login: LoginReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistLoginMiddleware),
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

if (typeof window !== 'undefined') {
  initializeLogin(mainStore);
}
