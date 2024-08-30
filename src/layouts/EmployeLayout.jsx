import { Dropdown } from "antd";
import { Outlet } from "react-router-dom";
import { CiGrid41, CiViewTable } from "react-icons/ci";
import { IoPeople, IoCloudUpload } from "react-icons/io5";
import { useState } from "react";
import CreateEmployeDrawer from "../components/employes/createDrawer";

export default function EmployeLayout() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const items = [
    {
      label: (
        <div
          className="flex items-center justify-start space-x-2"
          onClick={showDrawer}
        >
          <IoPeople size={16} />
          <p className="text-base font-thin">Créer un employé</p>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center justify-start space-x-2">
          <IoCloudUpload size={16} />
          <p className="text-base font-thin">Importation des employés</p>
        </div>
      ),
      key: "1",
    },
  ];

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-xl ">Liste des Employés</h1>
          <p className="font-thin text-lg">
            Voici la liste des employés de notre entreprise.
          </p>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex  px-1 py-1 justify-between rounded-full bg-[#ecf1fd]">
            <button className="bg-white p-1 rounded-full ">
              <CiGrid41 size={23} />
            </button>
            <button>
              <CiViewTable size={23} />
            </button>
          </div>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <button className=" py-2 px-4 rounded-2xl bg-[#E89D85] font-light">
              Nouveau
            </button>
          </Dropdown>
        </div>
      </div>
      <div>
        <Outlet />
      </div>

      <CreateEmployeDrawer open={open} onClose={onClose} />
    </div>
  );
}
