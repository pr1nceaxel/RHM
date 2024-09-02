/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Drawer } from "antd";

export default function CreateTeamDrawer({ open, onClose }) {
  return (
    <Drawer
      width={520}
      onClose={onClose}
      closable={true}
      open={open}
      style={{
        borderTopLeftRadius: "1.5rem",
        borderBottomLeftRadius: "1.5rem",
      }}
      title={
        <div>
          <h1 className="text-2xl ">Créer une équipe</h1>
        </div>
      }
      extra={
        <div className="bg-[#ecf1fd] py-1 px-2 rounded-lg flex space-x-2">
          <p className="font-thin">Etape</p>
          <div className="flex">
            <p className="font-normal">1</p>
            <p className="font-thin">/1</p>
          </div>
        </div>
      }
      footer={
        <div className="flex  items-center space-x-3 my-3">
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#ecf1fd] text-lg font-light"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
            type="primary"
            // onClick={showChildrenDrawer}
          >
            Suivant
          </button>
        </div>
      }
    >
      <div>
        <p className="text-xl font-light text-[#E87868]">Partie</p>
      </div>
    </Drawer>
  );
}
