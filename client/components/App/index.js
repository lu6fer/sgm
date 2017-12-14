import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;


import Navbar from '../Navbar';
import style from './app.css';


class Sgm extends React.Component {

    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Navbar />
                    <Layout>
                        <Header className={style.header} />
                        <Content >
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

Sgm.propTypes = {
    children: PropTypes.element.isRequired
};

export default Sgm;
