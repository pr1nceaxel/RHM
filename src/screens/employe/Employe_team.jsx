import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const EmployeTeam = () => {

  const navigate = useNavigate();



  return (

<div className="mx-5 py-3">
    <div className="flex mx-2 justify-between my-3">
    <div>
      <h1 className="text-xl font-bold">Liste des Equipes</h1>
      <p>Voici la liste des equipes de notre entreprise.</p>
    </div>
    <div>
      <Button type="primary" size="large" onClick={()=>navigate("/home/employees/team/create")}>
        Nouveau
      </Button>
    </div>
  </div>
</div>
  );
};
