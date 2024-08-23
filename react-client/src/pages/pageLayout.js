import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  DeleteOutlined,
  FolderOutlined,
  HomeOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    label: "Inicio",
    link: "/",
    icon: <HomeOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "2",
    label: "Painel",
    link: "/painel",
    icon: <AppstoreOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "3",
    label: "Documentos",
    link: "/documents",
    icon: <FolderOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "4",
    label: "Histórico de Consultas",
    link: "/appointments",
    icon: <ScheduleOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "5",
    label: "Lixeira",
    link: "/bin",
    icon: <DeleteOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "6",
    label: "Configurações",
    link: "/settings",
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
  },
];

const pageLayout = ({ children }) => (
  <Layout>
    <Header className="header"></Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
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
            minHeight: 600,
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
