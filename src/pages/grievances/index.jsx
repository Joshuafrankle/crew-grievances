import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";
import useAuth from "hooks/useAuth";
import Problem from "components/Problem";
import Loader from "components/Loader";
import FadeIn from "components/FadeIn";
import Popup from "components/Popup";
import GrievanceCard from "./GrievanceCard";
import ResolveForm from "./ResolveForm";
import DeleteForm from "./DeleteForm";

export default function DisplayGrievances() {
  const { data, loading, error } = useFetch("/admin");
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [err, setErr] = useState(false);

  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  function handleLogout() {
    setRole("null");
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) {
    return <Loader />;
  } else if (
    err ||
    error === "Internal Server Error" ||
    error === "No server response"
  ) {
    return <Problem />;
  } else {
    return (
      <>
        <FadeIn>
          <div className="admin-main">
            <div className="admin-head">
              <div>
                {/* <p className="admin-pattarai-text mb-0">PATTARAI'S</p> */}
                <p className="admin-grievance-text">Grievance Portal</p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn admin-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            {loading ? (
              <Loader height="70vh" />
            ) : (
              <GrievanceCard
                grievances={data.grievanceList}
                setId={setId}
                setOpenPopup={setOpenPopup}
              />
            )}
          </div>
        </FadeIn>

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
