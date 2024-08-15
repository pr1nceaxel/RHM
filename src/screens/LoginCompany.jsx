import logo from "../assets/LOGO.svg";
import { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import StepOne from "../components/company/form/StepOne";
import StepTwo from "../components/company/form/StepTwo";
import StepThree from "../components/company/form/StepThree";
const steps = [
  {
    title: "Entrepsie",
    content: <StepOne />,
  },
  {
    title: "Admin",
    content: <StepTwo />,
  },
  {
    title: "Paiement",
    content: <StepThree />,
  },
];

const LoginCompany = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: "18px",
    minHeight: "500px",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,  
padding: "20px 0px",
  };

  return (
    <>
      <div className=" w-2/5 mx-auto my-5">
        <div className="mb-5">
          <div className="flex items-center ">
            <img src={logo} alt="" className="w-16 h-16 my-2" />
            <h1 className="text-3xl font-medium "> Creer votre compte entreprise 🎉</h1>
          </div>
          <div className="">
            <p className="text-lg font-light">
              Creer votre compte entreprise pour beneficier de nos services.
            </p>
          </div>
        </div>
        <div>
          <Steps current={current} percent={60} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
              textAlign: "end",
            }}
          >
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginCompany;
