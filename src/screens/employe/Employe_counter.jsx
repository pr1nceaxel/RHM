import { Outlet } from "react-router-dom";

export const EmployeCounter = () => {
  return (
    <div className="mx-10">
      <div className="flex gap-10 pt-10 border-b-2 pb-2">
        <p className="font-medium text-base text-gray-400">Feuille de présence</p>
        <p className="font-medium text-base text-gray-400">
          Registre de pointage
        </p>
        <p className="font-medium text-base text-gray-400">
          Compteur d&rsquo;heure
        </p>
      </div>
      <div className="pt-10">
        <Outlet />
      </div>
    </div>
  );
};
