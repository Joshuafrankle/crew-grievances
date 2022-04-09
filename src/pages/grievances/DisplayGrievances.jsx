import React from "react";
import { useHistory } from "react-router-dom";
import FadeIn from "components/FadeIn";
import GetGrievances from "./GetGrievances";

export default function DisplayGrievances() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
  }

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
              type="button"
              className="btn admin-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <GetGrievances />
      </div>
    </FadeIn>
  );
}
