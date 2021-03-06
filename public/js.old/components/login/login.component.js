import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, IndexLink} from 'react-router';

import { DatePicker } from 'antd';
/**
 * Import all authService as an object.
 */
import * as authService from '../../services/authService';

import * as flashMessage  from '../../actions/flashMessage';

/**
 * Import custom components
 */
import FlashMessage from '../common/flash/message.component';
import renderText from '../login/renderText';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

   /* componentWillMount() {
        window.$('body').addClass('hold-transition login-page');
    }*/

    componentWillUnmount() {
        this.props.actions.removeFlashMessage();
    }

    handleSubmit(formProps) {
        this.props.actions.login(formProps);
    }

    render() {
        let message = this.props.message;
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                    <DatePicker />
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign into your account via email and password.</p>

                    <FlashMessage message={message}/>

                    <form method="post" onSubmit={handleSubmit(this.handleSubmit)}>
                        <Field
                            name="email"
                            component={renderText}
                            type="email"
                            label="Email"
                        >
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </Field>

                        <Field
                            name="password"
                            component={renderText}
                            type="password"
                            label="Password"
                        >
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </Field>

                        <div className="row">
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat"
                                        disabled={submitting}>Sign In
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <br/>
                            <div className="col-xs-8">
                                <Link to={'/forgot'}>I forgot my password</Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to={'/signup'}>Sign Up</Link>
                            </div>
                        </div>
                    </form>s

                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

/**
 * Map the state to props.
 */
function mapStateToProps(state) {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        message: state.flash.message
    }
}

/**
 * Map the actions to props.
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, authService, flashMessage), dispatch)
    }
}

const validateLogin = values => {
    const errors = {};
    if (!values.email) {
        errors.email = '(The email field is required.)'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.'
    }

    if (!values.password) {
        errors.password = '(The password field is required.)'
    }
    return errors
};

/**
 * Connect the component to the Redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'LoginForm', // ???A Unique identifier for this form
    validate: validateLogin  // ???Callback function for client-side validation
})(LoginForm))