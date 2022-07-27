import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Page1() {
  return (
    <div>
      <Row>
        <b>These is Page 1</b>
      </Row>
      <br />
      <Row>
        <Col>
          Goto <Link to="/page11">Page1.1</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          Goto <Link to="/page12">Page1.2</Link>
        </Col>
      </Row>
    </div>
  );
}

export default Page1;
