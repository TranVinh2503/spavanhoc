import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";
import "./about.css";

const About = () => {
  return (
    <section>
      <Container style={{ maxHeight: "450px" }}>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>Về chúng tôi ?</h2>
              <p>
                Đội ngũ của chúng tôi vô cùng rộng lớn và có chuyên môn trong
                lĩnh vực văn học. Từ những cá nhân đạt giải thưởng các cấp cho
                tới các giáo viên, nhà văn có sức ảnh hưởng lớn trong nền văn
                học Việt Nam.
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">bài văn đã được chỉnh sửa</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={30} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">người tin dùng</p>
                  </div>
                </div>

                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={90} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title"> lượt truy cập mỗi tháng</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={50} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">
                      {" "}
                      thành viên của đội ngũ cố vấn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
