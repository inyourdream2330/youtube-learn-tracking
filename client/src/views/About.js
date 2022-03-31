import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className="mt-5 px-0">
      <Col className="text-center">
        <a
          className="btn btn-primary"
          href="https://www.facebook.com/in.your.dream.2330/"
          target="_blank"
          rel="noreferrer"
        >
          FB cùa bạn Lâm cute thân thiện dễ gần
          <i className="far fa-heart ms-2"></i>
        </a>
      </Col>
    </Row>
  );
};

export default About;
