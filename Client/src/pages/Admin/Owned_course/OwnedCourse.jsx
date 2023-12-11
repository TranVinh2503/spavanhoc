import React, { useContext, useEffect, useState } from "react";
import "./owned_course.css";
import { AppContext } from "../../../context/AppContext";
const OwnedCourse = ({ owned_course }) => {
  const {domainName} = useContext(AppContext)
  const initialValues = {
    ID_course: "",
    Id_teacher: "",
    ID_student: "",
  };
  const [ownedCourse, setOwnedCourse] = useState(initialValues);
  const [readyAdd, SetReadyAdd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnedCourse({ ...ownedCourse, [name]: value });
  };

  const handleSubmit = () => {
    fetch(`http://${domainName}/api/add/owned_course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ownedCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.add) {
          SetReadyAdd(!readyAdd);
          window.location.href = "/admin";
        }
      })
      .catch(console.error());
    
  };

  const handleReadyAddOwnedCourse = () => {
    SetReadyAdd(!readyAdd);
  };
  return (
    <div className="container">
      <h2>Bảng sở hữu khóa học</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Gói</th>
            <th>Id Giáo viên</th>
            <th>Id Học Sinh</th>
          </tr>
        </thead>
        <tbody>
          {owned_course?.map((owned_course) => (
            <tr key={owned_course.id}>
              <td>{owned_course.id}</td>
              <td>{owned_course.course_id}</td>
              <td>{owned_course.user_id_gv}</td>
              <td>{owned_course.user_id_hs}</td>
            </tr>
          ))}
          {readyAdd && (
            <>
              <tr>
                <td>{owned_course[owned_course.length - 1]?.id + 1}</td>
                <td>
                  <input
                    name="ID_course"
                    className="form-control"
                    placeholder="ID của gói đăng kí"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="Id_teacher"
                    className="form-control"
                    placeholder="ID của giáo viên chữa"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="ID_student"
                    className="form-control"
                    placeholder="ID của học sinh đăng kí gói"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {readyAdd && (
        <button onClick={handleSubmit} className="btn">
          Thêm
        </button>
      )}
      {!readyAdd && (
        <button onClick={handleReadyAddOwnedCourse} className="btn">
          Thêm Khóa
        </button>
      )}
    </div>
  );
};

export default OwnedCourse;
