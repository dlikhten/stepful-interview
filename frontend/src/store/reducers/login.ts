import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AnyAction } from 'redux';
import { RootState } from 'store/store';

export type LoginReducerState = {
  currentEmail: string | null;
};

const initialState: LoginReducerState = {
  currentEmail: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    endSession: state => {
      state.currentEmail = null;
    },
    setCurrentEmail: (state, action: PayloadAction<string>) => {
      state.currentEmail = action.payload;
    },
  },
});

export const { setCurrentEmail, endSession } = loginSlice.actions;
export default loginSlice.reducer;

export const persistLoginMiddleware: Middleware<(action: AnyAction) => void, RootState> = api => next => action => {
  if (action.type === setCurrentEmail.type) {
    localStorage.setItem('currentEmail', action.payload);
  }
  if (action.type === endSession.type) {
    localStorage.removeItem('currentEmail');
  }
  return next(action);
};

export const initializeLogin = (store: ToolkitStore) => {
  const currentEmail = localStorage.getItem('currentEmail');

  if (currentEmail) {
    store.dispatch(setCurrentEmail(currentEmail));
  }
};
