import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Problem from "components/Problem";
import FadeIn from "components/FadeIn";
import { axiosRequest } from "components/DataFetch";
import Logo from "assets/images/logo.png";

export default function Home() {
  const history = useHistory();
  const buttonRef = useRef();
  const [error, setError] = useState(false);

  function getValues() {
    buttonRef.current.disabled = true;
    buttonRef.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
  }

  function handleLogout() {}

  return (
    <>
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
                  ref={buttonRef}
                  type="button"
                  className="btn home-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
