import React, { useEffect, useState } from "react";
import "./user.css";
const User = ({ users }) => {
  const [teacher, setTeacher] = useState();
  const [readyAdd, SetReadyAdd] = useState(false);

  const initialValues = {
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (
      teacher?.user_name !== "" &&
      teacher?.password !== "" &&
      (teacher?.role === 1 || teacher?.role === 2)
    ) {
      fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.register) {
            window.location.href = "/admin";
          }
        })
        .catch(console.error());
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (
        formValues.role === "Giáo viên" ||
        formValues.role === "giáo viên" ||
        formValues.role === "Giáo Viên" ||
        formValues.role === "giáo Viên"
      )
        setTeacher({
          user_name: formValues.user_name,
          email: formValues.email,
          password: formValues.password,
          role: 2,
        });
    } else if (
      formValues.role === "Học sinh" ||
      formValues.role === "Học Sinh" ||
      formValues.role === "học sinh" ||
      formValues.role === "học Sinh"
    ) {
      setTeacher({
        user_name: formValues.user_name,
        email: formValues.email,
        password: formValues.password,
        role: 1,
      });
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.user_name) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  const handleReadyAddTeacher = () => {
    SetReadyAdd(!readyAdd);
  };

  return (
    <div className="container">
      <h2>Thông tin người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.user_name}</td>
              <td>{user.password}</td>
              {user.role === 1 && <td>Học Sinh</td>}
              {user.role === 2 && <td>Giáo viên</td>}
              {user.role === 0 && <td>Admin</td>}
            </tr>
          ))}
          {readyAdd && (
            <>
              <tr>
                <td>{users[users.length - 1]?.id + 1}</td>
                <td>
                  <input
                    name="user_name"
                    className="form-control"
                    placeholder="vinh,..."
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="password"
                    className="form-control"
                    placeholder="Matkhau123@"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="role"
                    className="form-control"
                    placeholder="Giáo viên,..."
                    onChange={handleChange}
                  />
                </td>
                <button onClick={handleSubmit} className="btn">
                  Thêm
                </button>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {
        readyAdd && <button onClick={handleReadyAddTeacher} className="btnClose">
        Đóng
      </button>
      }
      {
        !readyAdd && <button onClick={handleReadyAddTeacher} className="btn">
        Thêm giáo viên
      </button>
      }
      
    </div>
  );
};

export default User;
