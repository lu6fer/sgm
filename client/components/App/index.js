import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
import Head from '../Head';
import Navbar from '../Navbar';
import {getRedirectUrl, getToken } from '../Login/selectors';
import { navigateTo } from '../Login/actions';


class Sgm extends React.Component {

    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn) {
            dispatch(navigateTo(redirectUrl));
            browserHistory.push(redirectUrl);
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Navbar />
                    <Layout>
                        <Head />
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

const mapStateToProps = createStructuredSelector({
    isLoggedIn: getToken(),
    redirectUrl: getRedirectUrl()
});

export default connect(mapStateToProps)(Sgm);
