import React from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

import Navbar from '../Navbar';


class Sgm extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }} >
                <Navbar />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: '90vh' }}>
                            content
                        </div>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}

export default Sgm;
