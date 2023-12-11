import React,{useContext} from "react";
import { Container, Row, Col } from "reactstrap";
import MyCourseCard from "./MyCourseCard";
import Header from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";


const MyCourses = () => {
  const { myCourses } = useContext(AppContext);

  return (
    <>
      <Header />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex justify-content-between align-items-center">
                <div className="course__top__left w-50">
                  <h2>Quy định các loại gói chữa bài</h2>
                  <p>
                    Hãy truy cập các gói mà bạn đã mua để Upload file bài văn bạn muốn sửa
                  </p>
                </div>
              </div>
            </Col>
            {myCourses.map((item) => (
              <Col key={item.id} lg="4" md="6" sm="6">
                <MyCourseCard key={item.id} item={item} />
              </Col>
            ))}
            
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyCourses;
