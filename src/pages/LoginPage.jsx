import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Problem from "../components/Problem";
import FadeIn from "../components/FadeIn";
import Logo from "../assets/images/pattarai-shine.gif";
import { axiosRequest } from "../components/DataFetch";

export default function LoginPage() {
  const history = useHistory();
  const buttonRef = useRef();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState({
    serverError: false,
    userError: "",
  });

  async function handleLogin() {
    setError({ ...error, userError: "" });
    buttonRef.current.disabled = true;
    buttonRef.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
    let res = null;
    try {
      res = await axiosRequest("/");
      console.log(res);
    } catch (err) {
      if (err.response.status === 5000) {
        setError({ ...error, serverError: true });
      } else {
        setError({ ...error, userError: res.data });
      }
    }
  }

  return (
    <>
      {error.serverError ? (
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
                  <p className="mb-0 pattarai-text"></p>
                  <h1 className="grievance-text">Grievance portal</h1>
                </div>
                <div className="input-section">
                  <input
                    className="form-control py-2"
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, userName: e.target.value })
                    }
                  />
                  <input
                    className="form-control py-2"
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  {error.userError && (
                    <p className="d-none pt-3 my-0 invalid-message text-start">
                      {error.userError}
                    </p>
                  )}
                  <button
                    ref={buttonRef}
                    type="button"
                    className="btn"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <p className="text-muted rights">
                  © {new Date().getFullYear()}| All Rights Reserved
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
