import Logo from "../../assets/images/logo.png";
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
          <div className="text-end logout-btn">
            <button
              id="grievance_logout_btn"
              type="button"
              className="btn mt-4 home-logout"
              style={{ position: "absolute" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <section className="main">
            <div className="" style={{ height: "100vh", width: "80%" }}>
              <div
                className="d-flex"
                style={{
                  paddingTop: "50px",
                  width: "100%",
                }}
              >
                <div className="" style={{ marginRight: "auto" }}>
                  <p
                    className="pattarai-text home-pattarai-text  mb-0"
                    style={{ marginLeft: "8px" }}
                  >
                    PATTARAI's
                  </p>
                  <p className="home-text-main">Grievance Portal</p>
                </div>
                <div>
                  <img className="" src={Logo} alt="Pattarai" />
                </div>
              </div>
              {theData.map((grievance, id) => (
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
              ))}
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
