import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getToken } from './selectors';
import { setRedirectUrl } from './actions';

class AuthChecker extends React.Component {
    componentDidMount() {
        const { isLoggedIn, dispatch, currentURL } = this.props;

        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            dispatch(setRedirectUrl(currentURL));
            browserHistory.replace('/login');
        }
    }

    render() {

        if (this.props.isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
    console.log(getToken(state));
    return {
        isLoggedIn: !!state.auth.token.toJS(),
        currentURL: ownProps.location.pathname
    };
}

// function mapStateToProps

export default connect(mapStateToProps)(AuthChecker);