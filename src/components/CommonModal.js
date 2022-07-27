import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { makeApiCall } from "../utils/Utility";

function CommonModal({ show, close, eventId, wrapperDeleteAlert }) {
  const navigate = useNavigate();

  console.log("CommonModal ", eventId);
  const [events, setEvents] = useState({});
  const [error, setError] = useState("");

  const getData = () => {
    axios
      .get(`${BASE_URL}/getByEventId/${eventId}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((e) => setError("Something went wrong! Please try again later"));
  };

  const deleteApi = () => {
    const resp = makeApiCall(`deleteByEventId/${eventId}`, "DELETE", {}, {});
    console.log(resp);
    close();
    wrapperDeleteAlert(true);
  };

  useEffect(() => {
    getData();
    console.log(eventId);
  }, [eventId]);
  return (
    <div>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Event Id:<b> {events.eventId}</b>
          </p>
          <p>
            Div Number: <b>{events.divNbr} </b>
          </p>

          <p>
            Event Name: <b>{events.eventName}</b>
          </p>
          <p>
            Updated By: <b>{events.lastUpdatedBy}</b>
          </p>
          <p>
            Updated dated: <b>{events.lastUpdateDate}</b>
          </p>
          <p>
            Created dated: <b>{events.createDate}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/events", {
                state: {
                  events: events,
                },
              });
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={deleteApi}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommonModal;
