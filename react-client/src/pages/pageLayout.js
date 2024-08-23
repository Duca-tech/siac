import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  { key: "1", label: "Inicio", link: "/" },
  { key: "2", label: "Painel", link: "/painel" },
  { key: "3", label: "Documentos", link: "/documents" },
  { key: "4", label: "Histórico de Consultas", link: "/appointments" },
  { key: "5", label: "Lixeira", link: "/bin" },
  { key: "6", label: "Configurações", link: "/settings" },
];

const pageLayout = ({ children }) => (
  <Layout>
    <Header className="header">
      <div className="logo" />
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
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
  </Layout>
);

export default pageLayout;
