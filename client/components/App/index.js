import React from 'react';
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
                        <Content style={{ margin: '0 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                Bill is a cat.
                            </div>
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

export default Sgm;
