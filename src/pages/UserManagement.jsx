import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { axiosRequest } from "components/DataFetch";

export default function UserManagement() {
  const [adminList, setAdminList] = useState([]);

  async function getAdmin() {
    const { data } = await axiosRequest("/sadmin");
    setAdminList(data.users);
  }
  function handleAdd() {}
  function handleDelete() {}

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center mt-10"
        style={{
          height: "100vh",
        }}
      >
        <h1>UserManagement 🚧</h1>
        <button
          style={{
            color: "#000",
          }}
          type="button"
          className="btn mt-3"
          onClick={handleAdd}
        >
          Add Admin
        </button>
        {adminList.map((admin) => (
          <div className="w-50 mt-5 d-flex justify-content-between align-items-center">
            <p>{admin.email}</p>
            <p>{admin.role}</p>
            <div className="">
              <button
                style={{
                  color: "red",
                }}
                type="button"
                className="btn mx-3"
                onClick={handleDelete}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
