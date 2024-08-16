import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  ConfigProvider,
  theme,
  Button,
  Avatar,
  Badge,
  Dropdown,
  Space,
} from "antd";
import { items } from "../constantes/sidebare";
import logo from "../assets/LOGO.svg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { dropDownMenuItems } from "../helpers/DropdonwAvatarList";

const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = () => {


  const [collapsed, setCollapsed] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#ffffff",
          colorPrimaryText: "#000000",
          colorMenuBackground: "#ffffff",
          colorMenuItemText: "#000000",
          colorMenuItemSelected: "#e6f7ff",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            position: "fixed",
            height: "100vh",
            left: 0,
            top: 0,
            background: "#ffffff",
            zIndex: 1000,
            width: collapsed ? 80 : 200, // Ajuster la largeur en fonction de l'état
            transition: "width 0.2s",
          }}
        >
          <div className="flex items-center justify-center">
            <img src={logo} alt="" className="w-20 h-20 my-2" />
            {collapsed ? null : <h1 className="text-lg font-bold ">E-RHM</h1>}
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{
              background: "#ffffff",
              color: "#000000",
            }}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200, // Ajuster le margin-left en fonction de l'état
            transition: "margin-left 0.2s",
          }}
        >
          <Header
            style={{
              position: "fixed",
              width: `calc(100% - ${collapsed ? 80 : 200}px)`, // Ajuster la largeur en fonction de l'état
              zIndex: 1000,
              padding: 0,
              background: "#ffffff",
              transition: "left 0.2s, top 0.3s",
              top: scrollDirection === "down" ? "-64px" : "0",
            }}
            className="flex items-center px-4"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <p>NAVBAR</p>

            <div className="ml-auto flex items-center gap-5 mx-10">
              <Badge count={5}>
                <IoMdNotificationsOutline size={24} />
              </Badge>
              <IoCalendarOutline size={24} />

              <Dropdown
                menu={{
                  items: dropDownMenuItems,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                  <Avatar
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                }}
              >
                U
              </Avatar>
                  </Space>
                </a>
              </Dropdown>
          
            </div>
          </Header>

          <Content
            style={{
              margin: "64px 0px 0",
              padding: "4px",
              overflow: "auto",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <div
              style={{
                minHeight: 360,
                background: "#ffffff",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#ffffff",
            }}
          >
            MELDO ©{new Date().getFullYear()} Created by Melone
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default HomeLayout;
