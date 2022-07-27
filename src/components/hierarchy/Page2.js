import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Page2() {
  return (
    <div>
      <Row>
        <b>These is Page 2</b>
      </Row>
      <br />
      <Row>
        <Col>
          Goto <Link to="/page21">Page2.1</Link>
        </Col>
      </Row>
    </div>
  );
}

export default Page2;
