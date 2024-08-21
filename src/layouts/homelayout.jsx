import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  ConfigProvider,
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
  const [collapsed, setCollapsed] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("up");

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
          colorBgContainer: "#ecf1fd",
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
            width: collapsed ? 80 : 200,
            transition: "width 0.2s",
          }}
        >
          <div className="flex items-center justify-center mb-10 mt-5">
            <img src={logo} alt="" className="w-10 h-10 my-2" />
            {collapsed ? null : <h1 className="text-lg font-bold ">E-RHM</h1>}
          </div>

          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            items={items}
            mode="inline"
            style={{
              background: "#ffffff",
              color: "#000000",
            }}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.2s",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header
            style={{
              position: "fixed",
              width: `calc(100% - ${collapsed ? 80 : 200}px)`,
              zIndex: 1000,
              padding: 0,
              background: "#ffffff",
              transition: "top 0.3s",
              top: scrollDirection === "down" ? "-64px" : "0",
            }}
            className="flex items-center px-4"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              // onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <p className="font-medium text-base text-gray-500">LOUTCHE</p>

            <div className="ml-auto flex items-center gap-5 mx-10">
              <p className="text-blue-950">Aide</p>
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
              flex: 1,
              padding: "64px 0 0",
              overflowY: "auto",
              minHeight: "calc(100vh - 128px)",
            }}
          >
            <div
              className="rounded-tl-3xl"
              style={{
                minHeight: "100%",
                background: "#ecf1fd",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#ffffff",
              transition: "bottom 0.3s",
              height: "10px",
              position: "fixed",
              width: `calc(100% - ${collapsed ? 80 : 200}px)`,
              bottom: scrollDirection === "down" ? "-64px" : "0",
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
