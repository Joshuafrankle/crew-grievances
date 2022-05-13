import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosRequest } from "components/DataFetch";
import Problem from "components/Problem";
import Loader from "components/Loader";
import FadeIn from "components/FadeIn";
import Popup from "components/Popup";
import GrievanceCard from "./GrievanceCard";
import ResolveForm from "./ResolveForm";
import DeleteForm from "./DeleteForm";

export default function DisplayGrievances() {
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [grievanceList, setGrievanceList] = useState([]);

  async function getGrievances() {
    try {
      const { data } = await axiosRequest("/admin");
      setGrievanceList(data.grievanceList);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getGrievances();
  }, []);

  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  if (error) {
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
                grievances={grievanceList}
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
}
