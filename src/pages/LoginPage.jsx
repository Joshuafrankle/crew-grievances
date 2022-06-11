import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import fetchData from "components/fetchData";
import Problem from "components/Problem";
import FadeIn from "components/FadeIn";
import Logo from "assets/images/pattarai-shine.gif";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const buttonRef = useRef();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    serverError: false,
    userError: "",
  });

  async function handleLogin() {
    setError({ serverError: false, userError: "" });
    buttonRef.current.disabled = true;
    buttonRef.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
    if (user.email.trim() === "" || user.password.trim() === "") {
      setError({ ...error, userError: "Please fill all the fields" });
      buttonRef.current.innerHTML = `Login`;
      buttonRef.current.disabled = false;
    } else {
      const [data, err] = await fetchData("/auth/login", "post", user);
      if (err) {
        setError({ ...error, userError: err });
        buttonRef.current.innerHTML = `Login`;
        buttonRef.current.disabled = false;
      } else {
        setRole(data.role);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    }
  }

  if (error.serverError) {
    return <Problem />;
  } else {
    return (
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
                  style={{
                    color: "black",
                  }}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  <p className="pt-3 my-0 invalid-message text-start">
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
                © {new Date().getFullYear()} | All Rights Reserved
              </p>
            </div>
          </div>
        </section>
      </FadeIn>
    );
  }
}
