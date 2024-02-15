import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {loginModel} from '../model/LoginModel';

/**
 * Interface for the login state.
 * @interface
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {string} error - Any error messages related to login.
 * @property {boolean} isLoggedIn - The login status of the user.
 */
interface LoginState {
  userName: string;
  password: string;
  error: string;
  isLoggedIn: boolean;
}

/**
 * The initial state of the login, matching the LoginState interface.
 * @type {LoginState}
 */
const initialState: LoginState = {
  userName: '',
  password: '',
  error: '',
  isLoggedIn: false,
};

/**
 * Async thunk action for performing the login operation.
 * @function
 * @async
 * @param {Object} param0 - The dispatched action.
 * @param {string} param0.username - The username.
 * @param {string} param0.password - The password.
 * @returns {Promise} The promise of the login operation.
 */
export const login = createAsyncThunk(
  'login/login',
  async ({userName, password}: {userName: string; password: string}) => {
    return await loginModel(userName, password);
  }
);

/**
 * A slice for login state with action creators and reducers generated by Redux Toolkit's createSlice function.
 * @type {Slice}
 */
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    /**
     * Reducer to set the username.
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {string} action.payload - The username.
     */
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    /**
     * Reducer to set the password.
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {string} action.payload - The password.
     */
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    /**
     * Reducer to reset the state to the initial state.
     * @returns {Object} The initial state.
     */
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      /**
       * Extra reducer for handling the fulfilled login action.
       * @param {Object} state - The current state.
       * @param {Object} action - The dispatched action.
       * @param {boolean} action.payload.success - The success status of the login operation.
       * @param {string} action.payload.token - The token received upon successful login.
       * @param {string} action.payload.error - The error message, if any.
       */
      .addCase(login.fulfilled, (state, action) => {
        const {success, token, error} = action.payload;
        if (success && token) {
          state.isLoggedIn = true;
          state.error = '';
        } else {
          state.error = error || 'Login failed';
        }
      })
      /**
       * Extra reducer for handling the rejected login action.
       * @param {Object} state - The current state.
       */
      .addCase(login.rejected, (state, action) => {
        state.error = 'Login request failed';
      });
  },
});

/**
 * Export the actions for use elsewhere in the application.
 */
export const {setUsername, setPassword, reset} = loginSlice.actions;

/**
 * Export the reducer function as the default export.
 */
export default loginSlice.reducer;
