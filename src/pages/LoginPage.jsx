import { useState } from "react";
import Problem from "../components/Problem";
import { useHistory } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Logo from "../assets/images/logo1.png";
import { endpoint } from "../components/Storage";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const history = useHistory();

  function changePage() {
    const loginButton = document.getElementById("login_btn");
    loginButton.setAttribute("disabled", true);
    loginButton.innerHTML = `<div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;

    const invalidUser = document.getElementById("invalid_user");
    const email = document.getElementById("emailId");
    const password = document.getElementById("password");
    const emailValue = email.value;
    const passwordValue = password.value;

    const userData = { emailValue, passwordValue };

    fetch(`${endpoint}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.user === "user") {
            window.localStorage.setItem("token", data.token);
            history.push("/home");
          } else if (data.user === "admin") {
            window.localStorage.setItem("token", data.token);
            history.push("/grievancelist");
          } else if (data.user === "false") {
            email.setAttribute("is-invalid", true);
            password.setAttribute("is-invalid", true);
            invalidUser.classList.remove("d-none");
            loginButton.innerHTML = "Login";
            loginButton.removeAttribute("disabled");
          }
        })
        .catch(() => {
          setError(true);
        });
    });
  }

  return (
    <>
      {error ? (
        <Problem />
      ) : (
        <FadeIn>
          <div className="login-circle1"></div>
          <div className="login-circle2"></div>
          <div
            className="text-center"
            style={{
              paddingTop: "30px",
            }}
          >
            <div className="login-logo">
              <img className="" src={Logo} alt="Pattarai" />
            </div>
            <p className="pattarai-text login-text mb-0">PATTARAI's</p>
            <p className="login-text-main">Grievance Portal</p>
          </div>
          <section className="main">
            <div style={{ width: "70%" }}>
              <div
                className="glass mt-3"
                style={{
                  paddingRight: "50px",
                  paddingLeft: "50px",
                }}
              >
                <h3 className="mb-4" style={{ color: "#fafafa" }}>
                  Login
                </h3>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="emailId"
                  placeholder="Email"
                  required
                ></input>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                ></input>

                <p
                  id="invalid_user"
                  className="d-none"
                  style={{ marginTop: "15px", color: "#ff5a3d" }}
                >
                  Invalid Email or Password
                </p>
                <button
                  type="button"
                  className="btn"
                  id="login_btn"
                  onClick={changePage}
                  style={{ marginTop: "15px" }}
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
