import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import VkLogin from 'react-vkontakte-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { loginVkServer,loginFbServer } from './client/api';
import User from './components/User'
import { connect } from 'react-redux';
import LogoutButton from './components/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { FB_API_KEY, VK_API_KEY } from './constants';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const responseVk = response => {
  console.log("VK AUTH");
  loginVkServer(response);
};

const responseFacebook = (response) => {
  console.log("FACEBOOK AUTH");
  loginFbServer(response);
}

const App = ({ authenticated, checked }) => (
  <Router>
      <Layout >
      <Header className="header" theme="light" >
      <div className="wrapper">
          { authenticated && 
          <div style={{float:"right"}}>
              <User/>
              <LogoutButton/>
          </div>}
          { !authenticated && 
          <Menu theme="dark" mode="horizontal" selectable="false" style={{float:"right"}}>
            <Menu.Item key="1"> 
              <VkLogin
                  apiId={VK_API_KEY}
                  callback={responseVk}
                  fields="name,email,picture" 
                  render={renderProps => (
                      <a onClick={renderProps.onClick}><FontAwesomeIcon icon={faVk} size="lg"/></a>
                  )}
              />
            </Menu.Item>
            <Menu.Item key="2">
              <FacebookLogin
                appId={FB_API_KEY}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                render={renderProps => (
                  <a onClick={renderProps.onClick}><FontAwesomeIcon icon={faFacebookSquare} size="lg"/></a>
                )}
                />
              </Menu.Item>
          </Menu>}
        </div>
      </Header>
      <div className="wrapper">
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    </Layout>
    
  </Router>
  
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);

