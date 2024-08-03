import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { Button } from "antd";

export const Departments = () => {
  const [rowData, setRowData] = useState([
    {
      label: "Développement",
      leader: "Jean Dupont",
      location: "Paris",
      budget: "200,000€",
      creationDate: "2022-03-01",
    },
    {
      label: "Ressources Humaines",
      leader: "Marie Curie",
      location: "Lyon",
      budget: "150,000€",
      creationDate: "2021-07-15",
    },
    {
      label: "Finance",
      leader: "Louis Pasteur",
      location: "Marseille",
      budget: "300,000€",
      creationDate: "2020-11-20",
    },
    {
      label: "Marketing",
      leader: "Claude Monet",
      location: "Nice",
      budget: "180,000€",
      creationDate: "2019-06-30",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Département" },
    { field: "leader", headerName: "Responsable" },
    { field: "location", headerName: "Localisation" },
    { field: "budget", headerName: "Budget" },
    { field: "creationDate", headerName: "Date de Création" },
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
          <h1 className="text-xl font-bold">Départements</h1>
          <p>Voici la liste des départements au sein de notre entreprise.</p>
        </div>
        <div>
          <Button type="primary" size="large">
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
        />
      </div>
    </div>
  );
};
