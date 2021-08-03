import { useState } from "react";
import Problem from "../components/Problem";
import Logo from "../assets/images/logo.png";
import FadeIn from "../components/FadeIn";
import { endpoint } from "../components/Storage";
import ThankyouPage from "./ThankyouPage";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [thankyouPage, setThankyouPage] = useState(false);

  function getValues() {
    const homeBtn = document.getElementById("home_btn");
    homeBtn.setAttribute("disabled", "true");
    homeBtn.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;

    const errorText = document.getElementById("error_text");
    const committeeDropdown = document.getElementById("committee_dropdown");
    const projectDropdown = document.getElementById("project_dropdown");
    const grievanceText = document.getElementById("grievance_text");

    const committeeValue =
      committeeDropdown.options[committeeDropdown.selectedIndex].value;
    const projectValue =
      projectDropdown.options[projectDropdown.selectedIndex].value;
    const grievanceValue = document.getElementById("grievance_text").value;

    if (grievanceValue.length >= 3) {
      const submitData = { committeeValue, projectValue, grievanceValue };
      fetch(`${endpoint}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      }).then((res) => {
        res
          .json()
          .then((data) => {
            if (data.status === "failure") {
              setError(true);
            } else if (data.status === "success") {
              setThankyouPage(true);
            }
          })
          .catch(() => {
            setError(true);
          });
      });
    } else {
      grievanceText.setAttribute("is-invalid", true);
      errorText.classList.remove("d-none");
      setTimeout(() => {
        errorText.classList.add("d-none");
        homeBtn.removeAttribute("disabled");
      }, 3000);
      homeBtn.innerHTML = "Submit";
    }
  }

  function handleLogout() {
    const homeLogoutBtn = document.getElementById("home_logout_btn");
    homeLogoutBtn.setAttribute("disabled", "true");
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
      ) : thankyouPage ? (
        <ThankyouPage />
      ) : (
        <FadeIn>
          <div className="home-circle1"></div>
          <div className="home-circle2"></div>
          <div className="text-end logout-btn"></div>
          <section className="main">
            <div>
              <div className="home-head">
                <div>
                  <p className="home-pattarai-text mb-0">PATTARAI'S</p>
                  <p className="home-grievance-text">Grievance Portal</p>
                </div>
                <div>
                  <img className="home-img" src={Logo} alt="" />
                </div>
              </div>
              <div className="home-glass">
                <h2 className="mt-1">
                  Choose the Project/Committee that you have grievances on
                </h2>
                <div className="dropdown-section">
                  <div className="dropdown1">
                    <p className="mb-2">Committee</p>
                    <select className="form-select" id="committee_dropdown">
                      <option selected>None</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Business Dev">Business Dev</option>
                      <option value="Events">Events</option>
                      <option value="Innovation & Media">
                        Innovation & Media
                      </option>
                    </select>
                  </div>
                  <div className="dropdown2">
                    <p className="mb-2">Project</p>
                    <select className="form-select" id="project_dropdown">
                      <option selected>None</option>
                      <option value="Project Cortex">Project Cortex</option>
                      <option value="Open Cloud">Open Cloud</option>
                      <option value="Workshop Hub">Workshop Hub</option>
                      <option value="Website Revamp">Website Revamp</option>
                      <option value="Pager">Pager</option>
                    </select>
                  </div>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Your Grievance"
                  id="grievance_text"
                ></textarea>
                <p
                  id="error_text"
                  className="d-none mt-3 ml-1 mb-0 invalid-message"
                >
                  Your text is too short
                </p>
                <div className="home-button">
                  <button
                    type="button"
                    className="btn"
                    id="home_btn"
                    onClick={getValues}
                  >
                    Submit
                  </button>
                  <button
                    id="home_logout_btn"
                    type="button"
                    className="btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
