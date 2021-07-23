import { useState } from "react";
import Problem from "../components/Problem";
import { useHistory } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import FadeIn from "../components/FadeIn";
import { endpoint } from "../components/Storage";

export default function Home() {
  const [error, setError] = useState(false);
  const history = useHistory();

  function getValues() {
    const HomeBtn = document.getElementById("home_btn");
    HomeBtn.setAttribute("disabled", "true");
    HomeBtn.innerHTML = `<div className="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>`;

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
            if (data.status === "success") {
              history.push("/thankyou");
            } else if (data.status === "failure") {
              //console.log(data.reason);
              setError(true);
            }
          })
          .catch(() => {
            setError(true);
          });
      });
    } else {
      grievanceText.setAttribute("is-invalid", true);
      errorText.classList.remove("d-none");
      HomeBtn.innerHTML = "Submit";
      HomeBtn.removeAttribute("disabled");
    }
  }

  return (
    <>
      {error ? (
        <Problem />
      ) : (
        <FadeIn>
          <div className="home-circle1"></div>
          <div className="home-circle2"></div>
          <section className="main">
            <div>
              <div
                className="d-flex"
                style={{
                  paddingTop: "80px",
                  width: "100%",
                }}
              >
                <div
                  className=""
                  style={{ marginLeft: "45px", marginRight: "auto" }}
                >
                  <p
                    className="pattarai-text home-pattarai-text mb-0"
                    style={{ marginLeft: "8px" }}
                  >
                    PATTARAI's
                  </p>
                  <p className="home-text-main">Grievance Portal</p>
                </div>
                <div>
                  <img
                    className=""
                    style={{ marginRight: "40px" }}
                    src={Logo}
                    alt="Pattarai"
                  />
                </div>
              </div>
              <div className="glass mt-2">
                <div className="heading-choose">
                  Choose the Project/Committee that you have grievances on
                </div>
                <div className="d-flex mt-4">
                  <div className="" style={{ width: "50%" }}>
                    <p className="text-white mb-1">Committee</p>
                    <select
                      className="form-select mb-4 mr-5"
                      id="committee_dropdown"
                    >
                      <option value="None">None</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Business Dev">Business Dev</option>
                      <option value="Events">Events</option>
                      <option value="Innovation & Media">
                        Innovation & Media
                      </option>
                    </select>
                  </div>
                  <div
                    className=""
                    style={{ width: "50%", marginLeft: "15px" }}
                  >
                    <p className="mb-1 text-white">Projects</p>
                    <select className="form-select mb-4" id="project_dropdown">
                      <option value="None">None</option>
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
                  id="grievance_text"
                  placeholder="Your Grievances"
                ></textarea>
                <p
                  id="error_text"
                  className="d-none mt-3 ml-1"
                  style={{ color: "#ff5a3d" }}
                >
                  Your text is too short
                </p>
                <button
                  type="button"
                  className="btn"
                  id="home_btn"
                  onClick={getValues}
                  style={{ marginTop: "25px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
