import { Button } from "antd"
import { useNavigate } from "react-router-dom";

export const  Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Button
    type="primary"
    size="large"
    onClick={() => navigate("/home")}
  >
    acceuil
  </Button>
  )
}
