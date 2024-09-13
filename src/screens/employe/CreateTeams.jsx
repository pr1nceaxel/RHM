import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Dropdown, Space, message } from "antd";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const membre1 = [
  { name: 'jean', label: 'Jean', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'prince', label: 'prince', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'yao', label: 'yao', post: 'developeur', role: 'membre', Actions: '...' },
];
const membre2 = [
  { name: 'paul', label: 'paul', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'christ', label: 'christ', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'AXEL', label: 'AXEL', post: 'developeur', role: 'membre', Actions: '...' },
];
const membre3 = [
  { name: 'koffi', label: 'koffi', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'aka', label: 'aka', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'henry', label: 'henry', post: 'developeur', role: 'membre', Actions: '...' },
];

const team = [
  { id: "1", name: 'TCHEPO', manager: 'axel', members: '3', description: '          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium velit doloribus dolores aliquid odit hic fuga cupiditate, quam recusandae nisi.', membersData: membre1 },
  { id: "2", name: 'AZALAPINHOU', manager: 'paul', members: '3', description: '          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium velit doloribus dolores aliquid odit hic fuga cupiditate, quam recusandae nisi.
', membersData: membre2 },
  { id: "3", name: 'AXEL', manager: 'koffi', members: '3', description: '          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium velit doloribus dolores aliquid odit hic fuga cupiditate, quam recusandae nisi.
', membersData: membre3 },
];


// Déplacez cette définition en haut, avant les `columnDefs`
const CustomButtonComponent = (props) => {
  const { data } = props;

  const navigate = useNavigate(); // Déplacez aussi `navigate` à l'intérieur du composant si nécessaire

  const handleMenuClick = (e) => {
    if (e.key === "0") {
      navigate(`/employees/team/${data.id}`, { state: { team: data, membersData: data.membersData } });
    // } else if (e.key === "1") {
    //   navigate(`/employees/edit/${data.id}`, { state: { team: data } });
    } else if (e.key === "2") {
      handleDelete(data.id);
    }
    if (!team || !membersData) {
      return <div>Aucune équipe sélectionnée. Veuillez réessayer.</div>;
    }
    
  };

  const items = [
    { label: "Détail", key: "0" },
    // { label: "Modifier", key: "1" },
    { type: "divider" },
    { label: "Supprimer", key: "2", danger: true },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <PiDotsThreeOutlineThin style={{ fontSize: 24 }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export function CreateTeams() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeam = team.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnDefs = [
    { headerName: "Nom", field: "name", sortable: true, filter: true },
    { headerName: "Manager", field: "manager", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    { headerName: "Membres", field: "members", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    { headerName: "Description", field: "description", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: CustomButtonComponent, // On appelle CustomButtonComponent ici
      flex: 0.4,
      filter: false,
    },
  ];

  const handleDelete = async (id) => {
    try {
      // Logique de suppression à définir ici
      message.success("Employé supprimé avec succès");
    } catch (error) {
      message.error(`Erreur lors de la suppression: ${error.message}`);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Rechercher une équipe..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 border border-gray-300 rounded"
      />

        <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={filteredTeam}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}























// {/*************************************************

// le code  en bas est pour connecter au server  j'ai essayer

// /*}








// /* eslint-disable react/prop-types */
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { PiDotsThreeOutlineThin } from "react-icons/pi";
// import {
//   Button,
//   Modal,
//   Form,
//   Input,
//   Select,
//   message,
//   Dropdown,
//   Space,
// } from "antd";

// import  useTeamStore  from "../../stores/store_team";
// import { createTeam, deleteTeam } from "../../api/api_departement";
// import useEmployeStore from "../../stores/store_employe";
// import { defaultColDef } from "../../constantes/gridText";


// const team = [
//   {  name: 'TCHEPO', 	manager:'axel',	members:'4',description:'dsjhbcsdhcsdjncbsdjcbdjcbs',		Actions:'...'   },
//   {  name: 'AZALAPINHOU', 	manager:'axel',	members:'4',description:'dsjhbcsdhcsdjncbsdjcbdjcbs',		Actions:'...'     },
//   {  name: 'AXEL',  	manager:'axel',	members:'4',description:'dsjhbcsdhcsdjncbsdjcbdjcbs',		Actions:'...'        },
// ];

// export const CreateTeam = () => {
//   const navigate = useNavigate();
//   const { team, loadTeam,removeTeam } = useTeamStore();
//   const { employees, loadEmployees } = useEmployeStore();

//   const [employe, setEmploye] = useState([]);


//   useEffect(() => {
//     loadEmployees();
//   }, [loadEmployees]);

//   useEffect(() => {
//     setEmploye(employees);
//   }, [employees]);

//   const [form] = Form.useForm();
//   const [rowData, setRowData] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleDelete = async (id) => {
//     try {
//       const response = await deleteTeam(id);
//       if (response.data.ok) {
//         removeTeam(id);
//         message.success("Equipe supprimé avec succès");
//         loadTeam();
//       }
//     } catch (error) {
//       message.error(`Oops! ${error.message}`);
//     }
//   };

//   const CustomButtonComponent = (props) => {
//     const { data } = props;
//     const handleMenuClick = (e) => {
//       if (e.key === "0") {
//         navigate(`/employee/${data.id}`);
//       } else if (e.key === "1") {
//         navigate(`/employee/${data.id}/edit`);
//       } else if (e.key === "2") {
//         handleDelete(data.id);
//       }
//     };

//     // const items = [
//     //   {
//     //     label: <a href="#">Détail</a>,
//     //     key: "0",
//     //   },
//     //   {
//     //     label: <a href="#">Modifier</a>,
//     //     key: "1",
//     //   },
//     //   {
//     //     type: "divider",
//     //   },
//     //   {
//     //     label: <a href="#">Supprimer</a>,
//     //     danger: true,
//     //     key: "2",
//     //   },
//     // ];

//     return (
//       <Dropdown
//         menu={{
//           items,
//           onClick: handleMenuClick,
//         }}
//         trigger={["click"]}
//       >
//         <a className="mt-6" onClick={(e) => e.preventDefault()}>
//           <Space>
//             <PiDotsThreeOutlineThin size={24} />
//           </Space>
//         </a>
//       </Dropdown>
//     );
//   };

//   useEffect(() => {
//     loadTeam();
//   }, [loadTeam]);

//   useEffect(() => {
//     setRowData(team);
//   }, [team]);

//   const [colDefs] = useState([
//     { field: "name", headerName: "Label" },
//     {
//       field: "manager",
//       headerName: "Manager",
//       valueFormatter: (params) => (params.value ? params.value : "N/A"),
//     },

//     {
//       field: "members",
//       headerName: "members",
//       valueFormatter: (params) => (params.value ? params.value : "aucun"),
//     },
//     {
//       field: "Action",


//       // cellRenderer: CustomButtonComponent,
//       // flex: 0.4,
//       // filter: false,
//     },
//   ]);



//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleRowClick = (event) => {
//     const { id } = event.data;
//     console.log("Row clicked:", id);
//   };

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();

//       if (values.budget <= 0) {
//         message.error("Le budget doit être supérieur à 0");
//         return;
//       }

//       try {
//         const response = await createTeam(
//           values.departmentName,
//           values.managerName,
//           values.location,
//           values.budget,
//           values.description
//         );
//         if (response.data.ok) {
//           form.resetFields();
//           setIsModalVisible(false);
//           message.success("Equipe créé avec succès");
//           loadTeam();
//         }
//       } catch (error) {
//         message.error(`Oops! ${error.message}`);
//       }
//     } catch (error) {
//       console.error("Une erreur est survenue:", error);
//     }
//   };

//   return (
//     <div className="mx-5 py-3 ag-theme-quartz">
//       <div className="flex mx-2 justify-between my-3">
//         <div>
//           <h1 className="text-xl font-bold">Equipes</h1>
//           <p>Voici la liste des equipes de notre entreprise.</p>
//         </div>
//         <div>
//           <Button type="primary" size="large" onClick={showModal}>
//             Ajouter une équipe
//           </Button>
//         </div>
//       </div>
//       <div className="ag-theme-quartz" style={{ height: "70vh" }}>
//       <AgGridReact
//           pagination={true}
//           rowData={rowData}
//           columnDefs={colDefs}
//           defaultColDef={defaultColDef}
//           onRowClicked={handleRowClick}
//         />
//       </div>

//       {/* Modal pour créer un nouveau département */}
//       <Modal
//         title="Créer une équipe"
//         open={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Annuler
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleSubmit}>
//             Soumettre
//           </Button>,
//         ]}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           requiredMark={false}
//           className="w-full mx-auto mt-5"
//           initialValues={{
//             remember: true,
//           }}
//           autoComplete="off"
//         >
//           <div className="flex w-full space-x-4 items-center justify-center mx-auto">
//             <Form.Item
//               label="Nom de l'équipes"
//               name="teamName"
//               className="w-full"
//               rules={[
//                 {
//                   required: true,
//                   message: "Veuillez entrer le nom de l'équipe!",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item label="Manager" name="managerName" className="w-full">
//               <Select showSearch placeholder="Sélectionner le manager" 
//                options={employe.map((dept) => ({
//                 value: dept.id,
//                 label: dept.firstName + " " + dept.lastName,
//               }))}
//               />
//             </Form.Item>
//           </div>
//           <Form.Item label="members" name="members">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Description" name="description">
//             <Input.TextArea placeholder="Ajouter une description pour ce département" />
//           </Form.Item>
//           {/* 
//           <Form.Item label="Budget en F CFA" name="budget">
//             <Input />
//           </Form.Item> */}          
//         </Form>
//       </Modal>
//     </div>
//   );
// };
