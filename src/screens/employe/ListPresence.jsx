import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import usePresenceStore from "../../stores/Pointage";

export default function ListPresence() {
  const [rowData, setRowData] = useState([]);
  const { presenceListTotal, loaPresenceListTotal } = usePresenceStore();

  useEffect(() => {
    loaPresenceListTotal();
  }, [loaPresenceListTotal]);

  useEffect(() => {
    setRowData(presenceListTotal);
  }, [presenceListTotal]);

  const [colDefs] = useState([
    {
      field: "employee",
      headerName: "Label",
      headerClass: "bg-[#ecf1fd]",
      cellRenderer: (params) => params.value,
      cellStyle: { display: 'flex', alignItems: 'center' } 
    },
    {
      field: "matricule",
      headerName: "matricule",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "date",
      headerName: "Date",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 
      
    },
    {
      field: "heureDebut",
      headerName: "Heure de début",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "pause",
      headerName: "Pause",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "reprise",
      headerName: "Reprise",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "fin",
      headerName: "Fin de service",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const handleRowClick = (event) => {
    const { id } = event.data;
    console.log("Row clicked:", id);
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          pagination={true}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
}
