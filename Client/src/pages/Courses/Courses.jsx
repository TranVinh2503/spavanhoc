import React,{useContext} from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";
import CourseCard from "./CourseCard";
import Header from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";


const Courses = () => {
  const { courses } = useContext(AppContext);

  return (
    <>
      <Header />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex justify-content-between align-items-center">
                <div className="course__top__left w-50">
                  <h2>Quy định các loại gói chữa bài theo tháng</h2>
                  <p>
                    Loại 1: Nhận xét chung( theo tư duy, diễn đạt, kiến thức) chấm điểm, highlight những gì ổn/chưa ổn.
                  </p>
                  <p>
                    Loại 2 = Loại 1 + Tip sửa những phần chưa ổn + đặt câu hỏi với những người chữa bài qua meeting
                  </p>
                </div>
              </div>
            </Col>
            {courses.map((item) => (
              <Col key={item.id} lg="4" md="6" sm="6">
                <CourseCard key={item.id} item={item} />
              </Col>
            ))}
            
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Courses;
