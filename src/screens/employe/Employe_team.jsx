/* eslint-disable react/prop-types */
import { AgGridReact } from "ag-grid-react";
import { defaultColDef } from "../../constantes/gridText";

export const EmployeTeam = () => {

  return (
    <div className="mx-5 py-3">
    <AgGridReact
        pagination={true}
        // rowData={rowData}
        // columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowHeight={50}
      />
    </div>
  );
};
