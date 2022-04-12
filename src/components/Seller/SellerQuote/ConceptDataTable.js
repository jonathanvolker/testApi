import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ConceptDataTable = ({ tableData, columns }) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default ConceptDataTable;
