import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assests/images/img1.png";
import courseImg2 from "../../assests/images/img2.png";
import courseImg3 from "../../assests/images/img3.png";
import "./courses.css";
import CourseCard from "./CourseCard";

const coursesData = [
  {
    id: "01",
    title: "Loại 1: Nhận xét chung( theo tư duy, diễn đạt, kiến thức)",
    lesson: 12,
    title: "Mua lẻ theo bài",
    lesson: 1,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Lẻ một bài: NLXH (15k), NLVH (25k)",
    lesson: 12,
    title: "Mua lẻ theo bài",
    lesson: 5,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "Lẻ năm bài: NLXH(75k), NLVH(125k), combo 5 NLXH và 5 NLVH (180k)",
    lesson: 12,
    title: "Mua theo tháng (1 Tháng - Loại 1)",
    lesson: "Không giới hạn",
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Courses = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Khoá học của chúng tôi</h2>
                <p>
                Giải pháp ôn luyện dành cho học sinh lớp 12
                Bao gồm 4 giai đoạn ôn luyện nhằm trang bị toàn diện kiến thức 
                kĩ năng cần thiết cho học sinh tham gia kì thi tuyển sinh đại học
                </p>
              </div>

              <div className="w-50 text-end">
                <button className="btn">See All</button>
              </div>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col key={item.id} lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
