import { useState, useEffect, Fragment } from "react";
import Header from "../../components/Header/Header";

import "./register.css";
import { Link } from "react-router-dom";

function Register() {
  const initialValues = {
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    role: 1,
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [registered, setRegistered] = useState(false);

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
        email: formValues.email,
        password: formValues.password,
        role: 1,
      });
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn't match. Try again.";
    }
    return errors;
  };

  useEffect(() => {
    if (user.user_name !== "" && user.email !== "" && user.password !== "") {
      fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.register) {
            setRegistered(true);
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
          {Object.keys(formErrors).length === 0 && isSubmit && registered ? (
            <div className="ui message success">Signed in successfully</div>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
              <p className="error">{formErrors.username}</p>
              <div className="field">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p className="error">{formErrors.email}</p>
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
              <div className="field">
                <label>Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <p className="error">{formErrors.confirmPassword}</p>
              <button className="btn2">Submit</button>
            </div>
          </form>
          <div className="text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>{" "}
      </>
    </Fragment>
  );
}

export default Register;
