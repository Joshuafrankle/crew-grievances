import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function UserManagement() {
  const rows = [
    { id: 1, col1: "Admin1", col2: "Enhancement" },
    { id: 2, col1: "Admin2", col2: "Complainant" },
    { id: 3, col1: "Admin3", col2: "Harassment" },
  ];

  const columns = [
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Assigned", width: 150 },
  ];

  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          height: "100vh",
        }}
      >
        <h1>UserManagement</h1>
        <div style={{ height: 400 }} className="w-100 w-md-50 mt-3">
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
