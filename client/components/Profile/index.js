import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Avatar } from 'antd';
const { Meta } = Card;
import UserUpdate from '../Forms/UserUpdate';
import { getProfile } from './selectors';
import { profileUpdate } from './actions';
import avatar from './avatar.png';
import style from './profile.css';

class Profile extends React.Component {
    render() {
        const { firstName, lastName } = this.props.profile;

        return (
            <Card
                className={style.card}
                cover={<img className={style.avatar} alt="example" src={avatar} />}
            >
                <Meta
                    avatar={<Avatar icon="user" />}
                    title={`${firstName} ${lastName}`}
                    description="Mon profile"
                />
                <UserUpdate onSubmit={this.props.update} profile={this.props.profile} />
            </Card>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    profile: getProfile()
});

function mapDispatchToProps(dispatch) {
    return {
        update: (user) => { dispatch(profileUpdate(user)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);