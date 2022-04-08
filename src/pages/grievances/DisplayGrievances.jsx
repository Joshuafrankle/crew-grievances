import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FadeIn from "components/FadeIn";
import Problem from "components/Problem";
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
            {/* <div>
        <img className="admin-img" src={Logo} alt="Pattarai" />
      </div> */}
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
          {grievances.map((grievance, index) => {
            return (
              <div key={`${grievance}-${index}`}>
                <FadeIn>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5>
                        <span className="badge" style={{ marginRight: "10px" }}>
                          {grievance[1]}
                        </span>
                        <span className="badge">{grievance[2]}</span>
                      </h5>
                      <p className="card-text font-weight-bold mt-3">
                        {grievance[3]}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </FadeIn>
    );
  }
}
