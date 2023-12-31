import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./company-section.css"
const Company = () => {
  return (
    <section className="company" >
      <Container>
    <section>
      <div style={{margin:"20px"}}>
        <Row>
          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className=" d-flex align-items-center gap-1">
              <i className="ri-vimeo-line"></i> Vimeo
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className=" d-flex align-items-center gap-1">
              <i className="ri-pinterest-line"></i> Pinterest
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className=" d-flex align-items-center gap-1">
              <i className="ri-dribbble-line"></i> Dribble
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className=" d-flex align-items-center gap-1">
              {" "}
              <i className="ri-apple-fill"></i> Apple
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className=" d-flex align-items-center gap-1">
              {" "}
              <i className="ri-finder-fill"></i> Finder
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h2 className=" d-flex align-items-center gap-1">
              {" "}
              <i className="ri-google-fill"></i> Google
            </h2>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Company;
