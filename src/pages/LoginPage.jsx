import { useState } from "react";
import Problem from "../components/Problem";
import { useHistory } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Logo from "../assets/images/pattarai-shine.gif";
import { endpoint } from "../components/Storage";

export default function LoginPage() {
  const date = new Date();
  const current_year = date.getFullYear();

  const [error, setError] = useState(false);
  const history = useHistory();

  function changePage() {
    const loginButton = document.getElementById("login_btn");
    loginButton.setAttribute("disabled", true);
    loginButton.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;

    const invalidUser = document.getElementById("invalid_user");
    const email = document.getElementById("emailId");
    const password = document.getElementById("password");
    const emailValue = email.value;
    const passwordValue = password.value;

    const userData = { emailValue, passwordValue };

    fetch(`${endpoint}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.status === "failure") {
            setError(true);
          } else if (data.status === "false") {
            invalidUser.classList.remove("d-none");
            setTimeout(() => {
              invalidUser.classList.add("d-none");
              loginButton.removeAttribute("disabled");
            }, 3000);
            loginButton.innerHTML = "Login";
          } else if (data.status === "success") {
            window.localStorage.setItem("token", data.token);
            if (data.role === "crew") {
              history.push("/home");
            } else if (data.role === "admin") {
              history.push("/grievancelist");
            }
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
          <section className="main">
            <div className="glass m-2 m-md-5 m-lg-0">
              <div className="logo-section">
                <img src={Logo} className="login-img" alt="" />
              </div>
              <div className="login-section">
                <div className="text-title">
                  <p className="mb-0 pattarai-text">PATTARAI'S</p>
                  <h1 className="grievance-text">Grievance portal</h1>
                </div>
                <div className="input-section">
                  <input
                    id="emailId"
                    className="form-control py-2"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    id="password"
                    className="form-control py-2"
                    type="password"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    id="login_btn"
                    className="btn"
                    onClick={changePage}
                  >
                    Login
                  </button>
                  <p className="d-none pt-3 invalid-message" id="invalid_user">
                    Invalid Email or Password
                  </p>
                </div>
                <p className="text-muted rights">
                  © {current_year} Pattarai | All Rights Reserved
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
