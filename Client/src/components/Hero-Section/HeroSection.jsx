import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.png";
import "./hero-Section.css";

const HeroSection = () => {
  return (
    <section>
      <Container className="hero" >
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Đừng lười <br /> Tôi xem <br /> Điểm mười 
              </h2>
              <p className="mb-5">
              Các khóa học bổ trợ kiến thức  <br />kỹ năng cho học sinh theo từng cấp học, <br>
              </br>giúp học sinh nâng cao năng lực học tập cá nhân,<br />tự tin khẳng định bản thân trong thời đại số
                
              </p>
            </div>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button className="btn">Tìm kiếm</button>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
