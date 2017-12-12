import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed, type) => {
        console.log(collapsed, type);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            >
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="bcd" />
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Navbar;
