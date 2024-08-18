import { Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";

export default function EmployeLayout() {
  const navigate = useNavigate();

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-xl font-bold">Liste des Employés</h1>
          <p>Voici la liste des employés de notre entreprise.</p>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex">
            <CiGrid41 size={28} />
            <CiViewTable size={28} />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/employees/create")}
          >
            Nouveau
          </Button>
        </div>
      </div>
      <div>
      <Outlet />
      </div>
    </div>
  );
}
