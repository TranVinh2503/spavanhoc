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
    title: "Mua lẻ theo bài",
    lesson: 1,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Mua lẻ theo bài",
    lesson: 5,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
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
                <h2>Our Popular Courses</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
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
