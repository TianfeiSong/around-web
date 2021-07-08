import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY } from "../constants";

export const loginSlice = createSlice({
    name: 'loginStatus',
    initialState: {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
    },
    reducers: {
        login: state => {
            state.isLoggedIn = true
        },
        logout: state => {
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;