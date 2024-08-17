import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const pageLayout = ({ children }) => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/forms">Forms</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/help">Help</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
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
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SIAC ©{new Date().getFullYear()} Todos os direitos reservados.
      </Footer>
    </Layout>
  </Layout>
);

export default pageLayout;
