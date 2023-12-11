import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assests/images/why-choose-us.png";
import "./choose-us.css";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section>
      <Container style={{ maxHeight: "450px" }}>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Tại sao bạn nên chọn chúng tôi?</h2>
              <p>
                Lần đầu tiên xuất hiện một nền tảng chấm chữa và đưa ra những
                chỉnh sửa chi tiết cho những bài văn, chúng tôi tự hào mang đến
                những trải nghiệm chưa từng có nhưng cũng vô cùng chuyên nghiệp.
                Bài văn của bạn sẽ được chấm bởi những chuyên gia văn học có
                tiếng với chất lượng không thể phủ nhận.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    className="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
