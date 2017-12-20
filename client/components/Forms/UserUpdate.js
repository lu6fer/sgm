import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

/* const UserUpdate = ({ profile, onSubmit }) => (Form.create(
    {
        mapPropsToFields() {
            console.log(profile);

            return {
                slug: Form.createFormField({
                    value: profile.slug
                }),
                lastName: Form.createFormField({
                    value: profile.lastName
                }),
                firstName: Form.createFormField({
                    value: profile.firstName
                }),
                email: Form.createFormField({
                    value: profile.email
                }),
                role: Form.createFormField({
                    value: profile.role
                }),
                membership: Form.createFormField({
                    value: profile.membership
                })
            };
        }
    })(
        (props) => {
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
                        onSubmit(values);
                    }
                });
            };

            return (
                <Form
                    onSubmit={handleSubmit}
                    layout="horizontal"
                >
                    {getFieldDecorator('slug')(<Input disabled type="hidden"/>)}
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
        })
); */

const UserUpdate = ({onSubmit, profile, form}) => {

    const { getFieldDecorator } = form;
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
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    return(
        <Form
            onSubmit={handleSubmit}
            layout="horizontal"
        >
            {getFieldDecorator('slug')(<Input disabled type="hidden"/>)}
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
                    <Select disabled={profile.role !== 'admin'}>
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
                        disabled={profile.role !== 'admin'}
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
};

UserUpdate.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};


export default Form.create({
    mapPropsToFields(props) {
        return {
            slug: Form.createFormField({
                value: props.profile.slug
            }),
            lastName: Form.createFormField({
                value: props.profile.lastName
            }),
            firstName: Form.createFormField({
                value: props.profile.firstName
            }),
            email: Form.createFormField({
                value: props.profile.email
            }),
            role: Form.createFormField({
                value: props.profile.role
            }),
            membership: Form.createFormField({
                value: props.profile.membership
            })
        };
    }
})(UserUpdate);