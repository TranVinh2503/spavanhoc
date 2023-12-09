import React, { useState } from "react";
import "./checking.css";
const Checking = ({ checking_data }) => {
  const initialValues = {
    id:"",
    status: "",
  };
  const [isEdit, setIsEdit] = useState();
  const [checkingCourse, SetCheckingCourse] = useState([]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    
    // Tạo một object mới thể hiện phần tử mới cần thêm vào mảng checkingCourse
    const newCourse = {
      id: id,
      [name]: value,
    };

    // Tìm xem nếu đã tồn tại phần tử có cùng id trong mảng, thì cập nhật nó
    const existingCourseIndex = checkingCourse.findIndex(course => course.id === id);
    if (existingCourseIndex !== -1) {
      const updatedCheckingCourse = [...checkingCourse];
      updatedCheckingCourse[existingCourseIndex] = { ...updatedCheckingCourse[existingCourseIndex], [name]: value };
      SetCheckingCourse(updatedCheckingCourse);
    } else {
      // Nếu không có phần tử nào cùng id, thêm phần tử mới vào mảng
      SetCheckingCourse([...checkingCourse, newCourse]);
    }
  };
  const handleSubmit = () => {
    for (let index = 0; index < checkingCourse.length; index++) {
      fetch("spavanhoc.fithanu.edu.vn/api/update/status_checking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkingCourse[index]),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.update) {
            window.location.href = "/admin";
          }
        })
        .catch(console.error());
    }

  };

  const handleIsEdit = () => {
    handleSubmit()
  };
  return (
    <div className="container">
      <h2>Tình trạng các gói đăng ký</h2>
      <p>
        Sửa 'Tình Trạng' = 1 để xác nhận khóa học và điền thông tin khóa học vào
        bảng dưới.
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID của gói</th>
            <th>Mã của học sinh</th>
            <th>Tình Trạng</th>
          </tr>
        </thead>
        <tbody>
          {checking_data.map((checking_data) => (
            <tr key={checking_data.id}>
              <td>{checking_data.id}</td>
              <td>{checking_data.courseId}</td>
              <td>{checking_data.User_id_hs}</td>
              {checking_data.status === 1 ? (
                <td>{checking_data.status}</td>
              ) : (
                <td>
                  <input
                    name="status"
                    onChange={(e) => handleChange(e, checking_data.id)}
                    className="form-control"
                  >
                  </input>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleIsEdit} className="btn">
        Cập nhật
      </button>
    </div>
  );
};

export default Checking;
