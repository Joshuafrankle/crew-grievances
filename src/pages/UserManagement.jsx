import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { axiosRequest } from "components/DataFetch";
import Popup from "components/Popup";
import DeleteForm from "./grievances/DeleteForm";
import ResolveForm from "./AddMember";

export default function UserManagement() {
  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [error, setError] = useState(false);

  async function getAdmin() {
    const { data } = await axiosRequest("/sadmin");
    setAdminList(data.users);
  }

  async function handleAdd() {
    const { data } = await axiosRequest("/sadmin");
  }

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
          onClick={() => {
            setId({
              deleteId: null,
              resolveId: 1,
            });
            setOpenPopup(true);
          }}
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
                onClick={() => {
                  setId({
                    deleteId: admin.userId,
                    resolveId: null,
                  });
                  setOpenPopup(true);
                }}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Popup
        title={id.deleteId ? "Are you sure wanna delete?" : "Member Form"}
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        {id.deleteId ? (
          <DeleteForm
            id={id.deleteId}
            setError={setError}
            setOpenModal={setOpenPopup}
          />
        ) : (
          <ResolveForm
            id={id.resolveId}
            setError={setError}
            setOpenModal={setOpenPopup}
          />
        )}
      </Popup>
    </>
  );
}
