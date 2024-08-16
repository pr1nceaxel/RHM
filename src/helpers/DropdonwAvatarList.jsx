import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

export const dropDownMenuItems = [
  {
    key: "1",
    label: (
      <div className="flex items-center gap-1">
        <CgProfile />
        <p>Mon profile</p>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex items-center gap-1">
      <IoSettingsOutline />
      <p>Mes parametres</p>
    </div>
    ),
    disabled: true,
  },
  {
    key: "3",
    danger: true,
    label: (
      <div className="flex items-center gap-1" onClick={()=>{}} >
        <CiLogout />
        <p>Deconnexion</p>
      </div>
    ),
  },
];
