/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector(state => state.user)
    console.log(" RightMenu user :", user);

    const navigate = useNavigate();
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <Link to="/login">로그인</Link>
                </Menu.Item>
                <Menu.Item key="app">
                    <Link to="/register">호원가입</Link>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default RightMenu;