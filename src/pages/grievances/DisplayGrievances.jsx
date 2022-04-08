import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FadeIn from "components/FadeIn";
import Problem from "components/Problem";
import GrievanceCard from "components/GrievanceCard";
import { axiosRequest } from "components/DataFetch";

export default function DisplayGrievances({ grievances }) {
  const history = useHistory();
  const [error, setError] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  if (error) {
    return <Problem />;
  } else {
    return (
      <FadeIn>
        <div className="admin-main">
          <div className="admin-head">
            <div>
              <p className="admin-pattarai-text mb-0">PATTARAI'S</p>
              <p className="admin-grievance-text">Grievance Portal</p>
            </div>
            <div>
              <button
                id="grievance_logout_btn"
                type="button"
                className="btn admin-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <GrievanceCard grievances={grievances} />
        </div>
      </FadeIn>
    );
  }
}
