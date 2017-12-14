import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { notification, Row, Col, Form, Icon, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;

import { getErrors } from './selectors';
import { login } from './actions';

import style from './login.css';


class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    };

    errorRender = () => {
        if (this.props.errors.length > 0) {
            for (let i = 0 ; i < this.props.errors.length ; i++) {
                const error = this.props.errors[i].error;
                notification.error({
                    message: 'Erreur',
                    description: `${error}`,
                    duration: 0
                });
            }
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        this.errorRender();

        return (
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6}}>
                    <Form onSubmit={this.handleSubmit} className={style.loginForm}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ type: 'email', required: true, message: 'n\'est pas un email valide' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Mot de passe obligatoire' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
                            )}
                        </FormItem>
                        <FormItem>
                            <a className={style.loginFormForgot} href="">mot de passe oublié</a>
                            <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                                Connexion
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    errors: getErrors()
});

function mapDispatchToProps(dispatch) {
    return {
        login: (credentials) => { dispatch(login(credentials)); }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));