import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { Button } from "antd";

export const Posts = () => {
  const [rowData, setRowData] = useState([
    {
      label: "Développeur Full Stack",
      leader: "Jean Dupont",
      datePosted: "2024-08-01",
      status: "Ouvert",
    },
    {
      label: "Responsable RH",
      leader: "Marie Curie",
      datePosted: "2024-07-20",
      status: "Fermé",
    },
    {
      label: "Comptable",
      leader: "Louis Pasteur",
      datePosted: "2024-07-15",
      status: "Ouvert",
    },
    {
      label: "Assistant Marketing",
      leader: "Claude Monet",
      datePosted: "2024-06-30",
      status: "En Cours",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Poste" },
    { field: "leader", headerName: "Responsable" },
    { field: "datePosted", headerName: "Date de Publication" },
    {
      field: "status",
      headerName: "Statut",
      cellRenderer: (params) => {
        switch (params.value) {
          case "Ouvert":
            return "🟢 Ouvert";
          case "Fermé":
            return "🔴 Fermé";
          case "En Cours":
            return "🟠 En Cours";
          default:
            return params.value;
        }
      },
    },
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
        <div className="">
          <h1 className="text-xl font-bold">Postes</h1>
          <p>
            Voici la liste des postes disponibles au sein de notre entreprise.
          </p>
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
