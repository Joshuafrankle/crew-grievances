import React, { useState } from "react";
import useFetch from "hooks/useFetch";
import fetchData from "components/fetchData";
import Loader from "components/Loader";
import Problem from "components/Problem";
import Popup from "components/Popup";
import DeleteForm from "./grievances/DeleteForm";
import ResolveForm from "./AddMember";
import { FiTrash } from "react-icons/fi";

export default function UserManagement() {
  const { data, loading, error } = useFetch("/sadmin");
  const [openPopup, setOpenPopup] = useState(false);
  const [err, setErr] = useState(false);
  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  async function handleAdd() {
    const { data } = await fetchData("/sadmin");
  }

  if (loading) {
    return <Loader />;
  } else if (error || err) {
    return <Problem />;
  } else {
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
          {data.users.map((admin) => (
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
              setError={setErr}
              setOpenModal={setOpenPopup}
            />
          ) : (
            <ResolveForm
              id={id.resolveId}
              setError={setErr}
              setOpenModal={setOpenPopup}
            />
          )}
        </Popup>
      </>
    );
  }
}
