/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Drawer,
  Input,
  Button,
  Select
} from "antd";
import React, { useState } from "react";

  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];




export default function CreateTeamDrawer({ open, onClose }) {
  const [team, setTeam] = useState({
    name: "",
    manager: "",
    members: "",
    description: ""
    
  });
 
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({
      ...team,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log("Team Data: ", team);
    // Logique pour soumettre les données du formulaire
  };

  return (
    <Drawer
      title={ <div> <h1 className="text-2xl ">Créer une équipe</h1></div> }
      width={500}
      closable={false}
      onClose={onClose}
      open={open}

        footer={
          <div className="flex  items-center space-x-3 my-3">
            <button
              className="flex  px-4 py-1 justify-between rounded-full bg-[#ecf1fd] text-lg font-light"
              onClick={onClose}

            >
              Annuler
            </button>
            {/* <button
              className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
              type="primary"
              onClick={handleCreate}
            >
            Enregistrer l'équipe
            </button> */}
            {/* <button
              className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
              type="primary"
              onClick={handleCreate}
            >
            Enregistrer l'équipe
            </button> */}
            
            <div className="text-right mt-4">
          <Button type="primary" onClick={handleSubmit}>
            Enregistrer l'équipe
          </Button>
        </div>
          </div>
        }      
    >

      <div>
        <p className="text-xl font-light text-[#E87868] mb-5">
          Renseigner le formulaire
        </p>
      </div>

      <div className="space-y-3 ">
        <div className="border w-full py-2 rounded-xl">
          <Input
            placeholder="Nom de l'équipe"
            variant="borderless"
            className="font-thin"
            name="name"
            value={team.name}
            onChange={handleChange}
          />
        </div>
        <div className=" w-full py-2 rounded-xl">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selectionner le manager"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            {
              value: '1',
              label: 'Not Identified',
            },
            {
              value: '2',
              label: 'Closed',
            },

          ]}
        />
        </div>
        <div className=" w-full py-2 rounded-xl">
          <Select
            mode="multiple"
            placeholder="Sélectionner des membres"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{ width: '100%' }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />


        </div>

        <div className="border w-full py-2 rounded-xl">
          <Input
            placeholder="Description"
            variant="borderless"
            className="font-thin"
            name="description"
            value={team.description}
            onChange={handleChange}
          />
        </div>

      </div>
    </Drawer>
  );
}
