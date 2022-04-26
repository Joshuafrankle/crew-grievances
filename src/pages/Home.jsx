import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Problem from "components/Problem";
import FadeIn from "components/FadeIn";
import { axiosRequest } from "components/DataFetch";
// import Logo from "assets/images/logo.png";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Home() {
  const history = useHistory();
  const buttonRef = useRef();

  const [error, setError] = useState({
    serverError: false,
    userError: "",
  });
  const [userGrievance, setUserGrievance] = useState({
    grievanceTitle: "",
    severity: "",
    grievance: "",
  });

  async function handleSubmit() {
    setError({ ...error, userError: "" });
    buttonRef.current.disabled = true;
    buttonRef.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
    if (
      userGrievance.grievanceTitle.trim() === "" ||
      userGrievance.grievance.trim() === "" ||
      userGrievance.severity.trim() === ""
    ) {
      setError({ ...error, userError: "Please fill all the fields" });
    } else if (userGrievance.grievance.trim().length < 100) {
      setError({
        ...error,
        userError: "Grievance should be more than 100 characters",
      });
    } else {
      try {
        const { data } = await axiosRequest(
          "/users/post-grievance",
          "POST",
          userGrievance
        );
        console.log(data);
      } catch ({ response }) {
        if (response.status >= 500) {
          setError({ ...error, serverError: true });
        } else {
          setError({ ...error, userError: response.data.message });
        }
      }
    }
    buttonRef.current.disabled = false;
    buttonRef.current.innerHTML = `Submit`;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  if (error.serverError) {
    return <Problem />;
  } else {
    return (
      <FadeIn>
        <div className="home-circle1"></div>
        <div className="home-circle2"></div>
        <div className="text-end logout-btn"></div>
        <section className="main">
          <div>
            <div className="home-head">
              <div>
                {/* <p className="home-pattarai-text mb-0">PATTARAI'S</p> */}
                <p className="home-grievance-text">Grievance Portal</p>
              </div>
              <div>{/* <img className="home-img" src={Logo} alt="" /> */}</div>
            </div>
            <div className="home-glass">
              <h2 className="mt-1">
                Choose the Organization that you have grievances on
              </h2>
              <div className="dropdown-section">
                <div className="dropdown1">
                  <TextField
                    fullWidth
                    focused
                    id="filled-basic"
                    label="Subject"
                    variant="filled"
                    onChange={(e) => {
                      setUserGrievance({
                        ...userGrievance,
                        grievanceTitle: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="dropdown2">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Severity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userGrievance.severity}
                      label="Severity"
                      onChange={(e) => {
                        setUserGrievance({
                          ...userGrievance,
                          severity: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value={`enhancement`}>Enhancement</MenuItem>
                      <MenuItem value={`complainant`}>Complainant</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <TextField
                focused
                sx={{ mt: 2 }}
                fullWidth
                id="filled-multiline-static"
                label="Your Grievance"
                multiline
                rows={4}
                variant="filled"
                onChange={(e) => {
                  setUserGrievance({
                    ...userGrievance,
                    grievance: e.target.value,
                  });
                }}
              />
              {error.userError && (
                <p className="mt-3 ml-1 mb-0 invalid-message">
                  {error.userError}
                </p>
              )}
              <div className="home-button">
                <button
                  ref={buttonRef}
                  type="button"
                  className="btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
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
    );
  }
}
