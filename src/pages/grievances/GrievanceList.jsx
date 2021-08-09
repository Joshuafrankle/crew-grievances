// import Logo from "../../assets/images/logo.png";
import FadeIn from "../../components/FadeIn";
import { useHistory } from "react-router-dom";
import Problem from "../../components/Problem";
import { endpoint } from "../../components/Storage";
import { useState } from "react";

export default function GrievanceList({ theData }) {
  const history = useHistory();
  const [error, setError] = useState(false);

  function handleLogout() {
    const grievanceLogoutBtn = document.getElementById("grievance_logout_btn");
    grievanceLogoutBtn.setAttribute("disabled", "true");

    const token = window.localStorage.getItem("token");
    const tokenValue = { token };

    fetch(`${endpoint}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenValue),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.status === "failure") {
            setError(true);
          } else if (data.status === "success") {
            window.localStorage.removeItem("token");
            history.push("/");
          }
        });
      })
      .catch(() => {
        setError(true);
      });
  }

  return (
    <>
      {error ? (
        <Problem />
      ) : (
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
            {theData.map((grievance, id) => {
              return (
                <FadeIn key={id}>
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
              );
            })}
          </div>
        </FadeIn>
      )}
    </>
  );
}
