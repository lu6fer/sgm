import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Layout, Row, Col, Icon, Button, Menu, Dropdown } from 'antd';
import { Link } from 'react-router';
const { Header } = Layout;

import style from './head.css';
import { getProfile } from '../Profile/selectors';

class Head extends React.Component {

    handleMenu = (value) => {

    };

    menu = () => (
        <Menu onClick={this.handleMenu}>
            <Menu.Item key="profile">
                <Icon type="user"/>
                <Link to="/profile">Mon profile</Link>
            </Menu.Item>
            <Menu.Item key="logout">
                <Icon className={style.icon} type="logout"/>
                <span>D&eacute;connexion</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Header className={style.header}>
                <Row>
                    <Col span={23}>
                        <div className={style.title}>SGM</div>
                    </Col>
                    <Col span={1}>
                        {
                            this.props.profile ?
                                <Dropdown overlay={this.menu()} placement="bottomRight">
                                    <Button className={style.menu} icon="user" shape="circle" type="primary" ghost/>
                                </Dropdown> :
                                null
                        }
                    </Col>
                </Row>
            </Header>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    profile: getProfile()
});

export default connect(mapStateToProps)(Head);