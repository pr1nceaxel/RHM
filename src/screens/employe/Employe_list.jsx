/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {  Dropdown, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

import { deleteEmploye } from "../../api/api_employe";
import  useEmployeStore  from "../../stores/store_employe";

export const EmployeList = () => {
  const navigate = useNavigate();
  const { employees, loadEmployees, removeEmployee } = useEmployeStore();
  const [rowData, setRowData] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteEmploye(id);
      if (response.ok) {
        message.success("Employé supprimé avec succès");
        removeEmployee(id);
        loadEmployees();
      }
    } catch (error) {
      message.error(`Erreur lors de la suppression: ${error.message}`);
    }
  };

  const CustomButtonComponent = (props) => {
    const { data } = props;
    const handleMenuClick = (e) => {
      if (e.key === "0") {
        navigate(`/employees/${data.id}`);
      } else if (e.key === "1") {
        navigate(`/employees/${data.id}`);
      } else if (e.key === "2") {
        handleDelete(data.id);
      }
    };

    const items = [
      { label: <a href="#">Détail</a>, key: "0" },
      { label: <a href="#">Modifier</a>, key: "1" },
      { type: "divider" },
      { label: <a href="#">Supprimer</a>, danger: true, key: "2" },
    ];

    return (
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <PiDotsThreeOutlineThin size={24} />
          </Space>
        </a>
      </Dropdown>
    );
  };

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    setRowData(employees);
  }, [employees]);

  const [colDefs] = useState([
    { field: "flag", headerName: "Photo", filter: false },
    { field: "lastName", headerName: "Prénom" },
    { field: "firstName", headerName: "Nom" },
    { field: "department", headerName: "Département" },
    { field: "position", headerName: "Poste" },
    {
      field: "Action",
      cellRenderer: CustomButtonComponent,
      flex: 0.4,
      filter: false,
    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  return (

      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          pagination={true}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

  
  )
};
