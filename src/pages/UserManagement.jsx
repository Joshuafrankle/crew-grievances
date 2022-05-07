import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function UserManagement() {
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  return (
    <>
      <h1>UserManagement</h1>
      <div style={{ height: 400 }} className="w-100 w-md-50">
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
