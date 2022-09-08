import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    const user = useSelector(state => state.user);


    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <Link to="/">홈</Link>
            </Menu.Item>

            <Menu.Item key="subscription">
                <Link to="/subscription">구독 비디오</Link>
            </Menu.Item>


            {user.userData && user.userData.isAuth &&
                <Menu.Item key="upload">
                    <Link to="/video/upload">비디오 업로드</Link>
                </Menu.Item>
            }
        </Menu>
    )
}

export default LeftMenu