import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { localeText } from "../constantes/gridText";
import axios from 'axios'; // Ajoutez axios pour la requête HTTP

export const EmployeeList = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "firstName", headerName: "Prénom" },
    { field: "lastName", headerName: "Nom" },
    { field: "position", headerName: "Poste" },
    { field: "department", headerName: "Département" },
    { field: "contractType", headerName: "Type de Contrat" },
    {
      field: "status",
      headerName: "Statut",
      cellRenderer: (params) => {
        switch (params.value) {
          case "Actif":
            return "🟢 Actif";
          case "En Congés":
            return "🟡 En Congés";
          case "Inactif":
            return "🔴 Inactif";
          default:
            return params.value;
        }
      }
    },
    { field: "email", headerName: "Adresse Email" }
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  const handleRowClick = (event) => {
    const employeeId = event.data.id;
    navigate(`/home/employees/${employeeId}`);
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employe');
        console.log(response.data); 
        setRowData(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-xl font-bold">Liste des Employés</h1>
          <p>Voici la liste des employés de notre entreprise.</p>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/employees/create")}
          >
            Nouveau
          </Button>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
          localeText={localeText}
        />
      </div>
    </div>
  );
};
