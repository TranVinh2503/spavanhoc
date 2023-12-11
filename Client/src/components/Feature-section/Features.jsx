import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Gửi bài",
    desc: "Hãy đăng bài văn của bạn lên (chúng tôi khuyến khích bạn hãy gửi file định dạng .docx hoặc .pdf để có kết quả tốt nhất). Phần còn lại hãy để chúng tôi lo!",
    icon: "ri-draft-line",
  },

  {
    title: "Chấm bài",
    desc: "Cứ từ từ thì khoai sẽ nhừ - bạn sẽ nhận được kết quả sau 24h - 48h tùy thuộc vào độ dài của văn bản, lúc này bài văn của bạn sẽ được chỉ rõ những lỗi đang có, và cách chúng tôi sửa nó sao cho phù hợp nhất với giọng văn của bạn.",
    icon: "ri-discuss-line",
  },

  {
    title: "Tải bài",
    desc: "Chúc mừng bạn đã có một bài văn thật hoàn chỉnh, giờ thì hãy nộp ngay cho giáo viên để có một học kỳ thật suôn sẻ nào!",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container style={{ maxHeight: "350px" }}>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i className={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
