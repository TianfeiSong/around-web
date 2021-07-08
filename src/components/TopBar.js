import React from 'react';
import logo from '../assets/images/logo.svg';
import { LogoutOutlined } from "@ant-design/icons";
import { TOKEN_KEY } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/loginSlice";

function TopBar() {
    const isLoggedIn = useSelector(state => state.loginStatus.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        dispatch(logout());
    };

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title">Around Web</span>
            {
                isLoggedIn ?
                    <LogoutOutlined className='logout' onClick={handleLogout} />
                    :
                    null
            }
        </header>
    );
}

export default TopBar;