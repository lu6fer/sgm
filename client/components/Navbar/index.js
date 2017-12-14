import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getProfile } from '../Login/selectors';
import style from './navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    itemsRender = () => {
      const items = [
          <Menu.Item key="1">
              <Icon type="tank" className={style.icon} />
              <span>Blocs</span>
          </Menu.Item>
      ];
      if (this.props.profile) {
          items.push(
              <Menu.Item key="2" >
                  <Icon type="regulator" className={style.icon} />
                  <span>Détendeur</span>
              </Menu.Item>,
              <Menu.Item key="3">
                  <Icon type="bcd" className={style.icon} />
                <span>Stab</span>
              </Menu.Item>,
              <Menu.Item key="4">
                  <Icon type="team" className={style.icon} />
                  <span>Utilisateurs</span>
              </Menu.Item>
          );
      }

      return items;
    };

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                breakpoint="lg"
                onCollapse={this.onCollapse}
            >
                <div className={style.logo} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {this.itemsRender()}
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    profile: getProfile()
});

export default connect(mapStateToProps)(Navbar);
