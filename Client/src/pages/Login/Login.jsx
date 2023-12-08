import { useState, useEffect, Fragment } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState({
    user_name: "",
    password: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [logined, setLogined] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setUser({
        user_name: formValues.username,
        password: formValues.password,
      });
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  useEffect(() => {
    if (user.user_name !== "" && user.password !== "") {
      fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.login && !data.admin && data.token) {
            setLogined(true);
            localStorage.setItem("access-token", data.token);
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
          if (data.login && data.admin && data.token) {
            setLogined(true);
            localStorage.setItem("access-token", data.token);
            setTimeout(() => {
              window.location.href = "/admin";
            }, 1000);
          }
        })
        .catch(console.error());
    }
  }, [user]);

  return (
    <Fragment>
      <Header />
      <>
        <div className="bgImg"></div>
        <div className="container-body">
          {Object.keys(formErrors).length === 0 && isSubmit && logined ? (
            <div className="ui message success">Đăng nhập thành công</div>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <p className="error">{formErrors.username}</p>
              <div className="field">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p className="error">{formErrors.password}</p>
              <button className="btn2 ">Login</button>
            </div>
          </form>
          <div className="text">
            Don't has a account? <Link to="/register">Register</Link>
          </div>
        </div>{" "}
      </>
    </Fragment>
  );
}

export default Login;
