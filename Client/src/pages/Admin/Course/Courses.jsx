import React from "react";
import "./courses.css";
const Courses = ({ coursesData }) => {
  return (
    <div className="container">
      <h2>Các khóa học hiện có</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Lesson</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {coursesData.map((coursesData) => (
            <tr key={coursesData.id}>
              <td>{coursesData.id}</td>
              <td>{coursesData.course}</td>
              <td>{coursesData.infor}</td>
              <td>{coursesData.cost} (VND)</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Chú ý các khóa học ở trên đã được tính toán cẩn thận trước khi thêm vào</p>
      <button className="btn">Thêm Khóa Học</button>
    </div>
  );
};

export default Courses;
