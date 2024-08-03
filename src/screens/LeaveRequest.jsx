import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { Button } from "antd";

export const LeaveRequest = () => {
  const [rowData, setRowData] = useState([
    {
      employeeName: "Jean Dupont",
      reason: "Motif de congés personnel. Besoin de temps pour des raisons familiales.",
      startDate: "2024-08-05",
      endDate: "2024-08-15"
    },
    {
      employeeName: "Marie Curie",
      reason: "Congés annuels pour voyage.",
      startDate: "2024-07-20",
      endDate: "2024-07-30"
    },
    {
      employeeName: "Louis Pasteur",
      reason: "Congés maladie.",
      startDate: "2024-06-10",
      endDate: "2024-06-20"
    },
    {
      employeeName: "Claude Monet",
      reason: "Motif personnel, nécessité de repos.",
      startDate: "2024-09-01",
      endDate: "2024-09-10"
    }
  ]);

  const [colDefs, setColDefs] = useState([
    { 
      field: "employeeName", 
      headerName: "Employé" 
    },
    { 
      field: "reason", 
      headerName: "Motif",
      cellRenderer: (params) => params.value.length > 20 ? `${params.value.substring(0, 20)}...` : params.value
    },
    { 
      field: "startDate", 
      headerName: "Date de Début" 
    },
    { 
      field: "endDate", 
      headerName: "Date de Fin" 
    }
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

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-xl font-bold">Liste des Demandes de Congés</h1>
          <p>Voici la liste des demandes de congés des employés.</p>
        </div>
        <div>
          <Button type="primary" size="large">
            Nouvelle Demande
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
        />
      </div>
    </div>
  );
};
