import logo from "../assets/LOGO.svg";
import { Button, Checkbox, Form, Input } from "antd";

export const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex h-screen ">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <p>left</p>
      </div>
      <div className="w-1/2 bg-white m-10">
        <div className="flex items-center ">
          <img src={logo} alt="" className="w-16 h-16 my-2" />
          <h1 className="text-4xl font-medium ">E-RHM</h1>
        </div>
        <div className="my-10">
          <h1 className="text-2xl font-medium ">Content de vous revoir 👋 </h1>
          <p className="text-lg font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam eos
            voluptate quos optio eligendi, dolorum eveniet reiciendis{" "}
          </p>
        </div>
        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="EMail"
            name="email"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre email!",
              },
            ]}
          >
            <Input />
            
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
