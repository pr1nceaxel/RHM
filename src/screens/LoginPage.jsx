import logo from "../assets/LOGO.svg";
import { Button, Checkbox, Form, Input } from "antd";
import { useState, useEffect } from "react";
import useAuthStore from "../stores/auth";
import { loginUser } from "../api/auth";


// Liste des images du diaporama
const images = [
  "https://images.unsplash.com/photo-1723125742314-22a9028e0096?q=80&w=2898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721332150382-d4114ee27eff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723642019190-b44549d0ed21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1723491371211-83d20430837c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1723649902616-0dce94980e06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
];

export default function LoginPage() {
  const { login } = useAuthStore();

  const onFinish = async (values) => {
    if (values.email === "") {
      alert("Veuillez entrer votre email");
      return;
    }
    if (values.password === "") {
      alert("Veuillez entrer votre mot de passe");
      return;
    }

    try {
      const response = await loginUser(values.pseudo, values.password);
      if (response.data.ok) {
        login(response.data.data, response.data.token);
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Pseudo ou mot de passe incorrect");
      }
      if (error.response.status === 500) {
        alert("Erreur serveur");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex h-screen ">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center sm:hidden md:block">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className=" w-full h-full object-cover transition  duration-1000 ease-in-out"
        />
      </div>
      <div className="w-1/2 bg-white m-10 sm:w-full md:w-1/2">
        <div className="flex items-center ">
          <img src={logo} alt="" className="w-16 h-16 my-2" />
          <h1 className="text-4xl font-medium ">E-RHM</h1>
        </div>
        <div className="my-10">
          <h1 className="text-2xl font-medium ">Content de vous revoir 👋 </h1>
          <p className="text-lg font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam eos
            voluptate quos optio eligendi, dolorum eveniet reiciendis
          </p>
        </div>
        <div className="">
          <Form
            name="basic"
            layout="vertical"
            requiredMark={false}
            className="w-full mx-auto p-10"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex-col justify-center  items-center">
              <div>
                <Form.Item
                  label="Pseudo"
                  name="pseudo"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer votre pseudo!",
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
              </div>
              <div className="">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Se souvenir de moi</Checkbox>
                </Form.Item>
              </div>
            </div>

            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit" size="large">
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
