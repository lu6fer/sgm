import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import style from './navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="tank" className={style.icon} />
                        <span>Blocs</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="regulator" className={style.icon} />
                        <span>Détendeur</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="bcd" className={style.icon} />
                        <span>Stab</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="team" className={style.icon} />
                        <span>Utilisateurs</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Navbar;
