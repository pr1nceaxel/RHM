import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal,Select,Input   } from 'antd';


export function EmployeTeam() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { team,membersData } = state; // Récupérer les données de l'équipe

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
    const showModal2 = () => {
      setIsModalOpen2(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleOk2 = () => {
      setIsModalOpen2(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleCancel2 = () => {
      setIsModalOpen2(false);
    };
  

    
  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <div className="">
        <button
          className="bg-gray-500 text-white border p-2"
          onClick={() => navigate("/employees/team/create")}
        >
          Retour aux équipes
        </button>
      </div>
      <div className="flex space-x-3 mb-3 justify-between">
        <h1 className='text-xl font-bold' >Membre de l'équipe {team.name}</h1>
        <div className="mx-3">
          <Button className="bg-white-500 mx-2 border p-2"  onClick={showModal}>
          Modifier équipe
          </Button>

          <Button className="bg-green-500 border p-2" onClick={showModal2}>
            Ajouter Membre
          </Button>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-center">Poste</th>
            <th className="px-4 py-2 text-center">Rôle</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.membersData.map((member, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2 text-center">{member.post}</td>
              <td className="px-4 py-2 text-center">{member.role}</td>
              <td className="flex items-center space-x-5 px-4 py-2">
                <a className="bg-red-500 p-2">
                  <RiDeleteBin2Line />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title={`Modifier l'équipe « ${team.name} »`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       
        <div className="border  py-2 mb-3 rounded-xl">

          <Input
            placeholder="Nom de l'équipe"
            variant="borderless"
            className="font-thin"
            name="name"
            value=""
          />
        </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selectionner le manager"
          optionFilterProp="label"
          label={membersData}
          value={membersData}
          onChange={value => setSelectedManager(value)}
          filterSort={(optionA, optionB) =>
            (optionA?.membersData.label ?? '').toLowerCase().localeCompare((optionB?.membersData.label ?? '').toLowerCase())
          }
          options={membersData} // Utilisation des membres dans le Select
        />
        </Modal>


      <Modal title={`Ajouter des membres à l'équipe « ${team.name} »`} open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
       

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selectionner le manager"
          optionFilterProp="label"
          label={membersData}
          value={membersData}
          onChange={value => setSelectedManager(value)}
          filterSort={(optionA, optionB) =>
            (optionA?.membersData.label ?? '').toLowerCase().localeCompare((optionB?.membersData.label ?? '').toLowerCase())
          }
          options={membersData} // Utilisation des membres dans le Select
        />
        </Modal>
    </div>
  );
}
