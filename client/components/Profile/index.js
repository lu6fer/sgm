import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Avatar, Form, Input, Select, Checkbox, Button } from 'antd';
const { Meta } = Card;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import { getProfile } from './selectors';
import avatar from './avatar.png';
import style from './profile.css';

const UserProfile = Form.create({
    mapPropsToFields(props) {
        const data = {
            lastName: Form.createFormField({
                value: props.lastName
            }),
            firstName: Form.createFormField({
                value: props.firstName
            }),
            email: Form.createFormField({
                value: props.email
            }),
            role: Form.createFormField({
                value: props.role
            }),
            membership: Form.createFormField({
                value: Object.keys(props.membership).map((key) => {
                    if (props.membership[key]) {
                        return key;
                    }
                })
            })
        };
        console.log(data.membership);

        return data;
    }
})((props) => {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };

    return (
        <Form
            onSubmit={handleSubmit}
            layout="horizontal"
        >
            <FormItem
                {...formItemLayout}
                label="Nom"
            >
                {getFieldDecorator('firstName')(<Input disabled/>)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Prenom"
            >
                {getFieldDecorator('lastName')(<Input disabled/>)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Email"
            >
                {getFieldDecorator('email')(<Input disabled/>)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Role"
            >
                {getFieldDecorator('role')(
                    <Select disabled={props.role !== 'admin'}>
                        <Option key="user">Utilisateur</Option>
                        <Option key="instructor">Moniteur</Option>
                        <Option key="admin">Administrateur</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Droit emprunt"
            >
                {getFieldDecorator('membership')(
                    <CheckboxGroup
                        options={[
                            { label: 'Bloc', value: 'tank' },
                            { label: 'Détendeur', value: 'regulator' },
                            { label: 'Stab', value: 'bcd' }
                        ]}
                        disabled={props.role !== 'admin'}
                    />
                )}
            </FormItem>
            <FormItem
                {...tailFormItemLayout}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Enregistrer
                </Button>
            </FormItem>
        </Form>
    );
});

class Profile extends React.Component {
    onChange = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };

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
                <UserProfile {...this.props.profile} />
            </Card>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    profile: getProfile()
});

export default connect(mapStateToProps)(Profile);