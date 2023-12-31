import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
const CourseAccess = () => {
  const { id } = useParams();
  const { user, domainName } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(false);
  const [course, SetCourse] = useState();
  const [ownedCourse, SetOwnedCourse] = useState();
  const [files, SetFiles] = useState([]);

  useEffect(() => {
    fetch(`http://${domainName}/api/course/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        SetCourse(data.course[0]);
        SetOwnedCourse(data.ownedCourses[0]);
      })
      .catch(console.error());
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUploadFile = () => {
    if (selectedFile && user.role === 1) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(`http://${domainName}/api/upload/${id}/${ownedCourse?.id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUploadFile(true);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi tải lên file:", error);
        });
    } else if (selectedFile && user.role === 2) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(`http://${domainName}/api/upload_fixed/${id}/${ownedCourse?.id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUploadFile(true);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi tải lên file:", error);
        });
    } else {
      console.log("Bạn chưa chọn file nào.");
    }
  };

  const handleDownload = () => {
    if (uploadFile) {
      // Tạo một URL cho file và tạo một link để tải file về
      const downloadUrl = URL.createObjectURL(selectedFile);
      // Tạo một thẻ a ẩn để thực hiện việc tải file về tự động
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    fetch(
      `http://${domainName}/api/all/files_owned_course/${ownedCourse?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        SetFiles(data);
      })
      .catch(console.error());
  }, [uploadFile, ownedCourse?.id]);

  return (
    <>
      <Header />
      <section>
        <div style={{margin:"50px"}}>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex justify-content-between align-items-center">
                <div className="course__top__left w-50">
                  <h2>{course?.course}</h2>
                  <p>{course?.infor} bài</p>
                </div>
              </div>
            </Col>
            <Col lg="12">
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleFileChange}
                />
                <div className="input-group-append">
                  <button className="btn" onClick={handleUploadFile}>
                    Tải lên
                  </button>
                </div>
              </div>
            </Col>
            {uploadFile && (
              <Col lg="12" className="mt-3">
                <p>File đã tải lên: {selectedFile.name}</p>
              </Col>
            )}
          </Row>
        </div>
        <div className="container">
          <h2>Các file đã upload</h2>
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>File đã chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>
                    {file.UrlFile && (
                      <a href={`http://${domainName}/${file.UrlFile}`}>
                        {file.UrlFile?.split("/").pop()}
                      </a>
                    )}
                  </td>
                  <td>
                    {file.UrlFile_fixed && (
                      <a href={`http://${domainName}/${file.UrlFile_fixed}`}>
                        {file.UrlFile_fixed?.split("/").pop()}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CourseAccess;
