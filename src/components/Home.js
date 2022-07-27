import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CommonModal from "./CommonModal";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [eventId, setEventId] = useState();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [filteredData, setFilteredData] = useState([]);

  const searchFilter = (searchTerm) => {
    if (searchFilter) {
      const filtered = data.filter(
        (row) => row.eventName.toLowerCase().indexOf(searchTerm) > -1
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const wrapperDeleteAlert = useCallback(
    (val) => {
      setDeleteAlert(val);
    },
    [deleteAlert]
  );

  const getData = () => {
    axios.get(`${BASE_URL}/getAllEvents`).then((response) => {
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      <Row>
        <Row className="md-4">
          <Link to="/page1">Page1</Link>
        </Row>
        <Row style={{ marginLeft: 15 }}>
          <Link to="/page11">Page1.1</Link>
        </Row>
        <Row style={{ marginLeft: 15 }}>
          <Link to="/page12">Page1.2</Link>
        </Row>
        <Row>
          <Link to="/page2">Page2</Link>
        </Row>
        <Row style={{ marginLeft: 15 }}>
          <Link to="/page21">Page2.1</Link>
        </Row>
      </Row>
      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#000000",
        }}
      />
      <Button
        variant="link"
        className="float-end"
        onClick={() => navigate("/events")}
      >
        Create Event
      </Button>
      <h2>Events Details...</h2>
      <Form.Label htmlFor="diviNameFilter">Filter by Event name</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="event name"
          aria-label="Event"
          aria-describedby="basic-addon1"
          onChange={(event) => searchFilter(event.target.value)}
        />
      </InputGroup>
      <br />
      <div style={{ paddingBottom: "10px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Division Nbr</th>
              <th>last Updated By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(function (row, i) {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{row.eventName}</td>
                  <td>{row.divNbr}</td>
                  <td>{row.lastUpdatedBy}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleShow();
                        setModalFlag(true);
                        setEventId(row.eventId);
                        console.log(row.eventId);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {modalFlag && (
          <CommonModal
            show={show}
            close={handleClose}
            eventId={eventId}
            wrapperDeleteAlert={wrapperDeleteAlert}
          />
        )}
        {deleteAlert && (
          <Alert key="success" variant="success">
            Deleted
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Home;
