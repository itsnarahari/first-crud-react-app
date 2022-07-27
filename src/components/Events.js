import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { makeApiCall } from "../utils/Utility";

function Events() {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [divNbr, setDivNbr] = useState("");
  const [eventName, setEventName] = useState("");
  const [method, setMethod] = useState("POST");
  const [path, setPath] = useState("addNewEvent");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = {
      divNbr: divNbr,
      eventName: eventName,
      lastUpdatedBy: "BH21247",
    };
    if (isEditMode) {
      body["eventId"] = state.events.eventId;
      body["lastUpdatedBy"] = "BHUPDATED";
    }

    const response = makeApiCall(path, method, {}, body)
      .then((response) => {
        if (response.code === "ERR_BAD_REQUEST") {
          console.log(response.response.data.message);
          setAlertFlag(true);
          setAlertMessage(
            response.response.data
              ? response.response.data.message
              : "Something went wrong try again later"
          );
          setAlertVariant("danger");
        } else {
          setAlertFlag(true);
          setAlertMessage(
            `Events ${isEditMode ? "Updated" : "Created"} Successfully`
          );
          setAlertVariant("success");
          setTimeout(() => navigate("/"), 1500);
        }
        console.log(response.code);
      })
      .catch((e) => {
        console.log("catch", e);
      });
    console.log(response);
  };

  useEffect(() => {
    if (state) {
      setEventName(state.events.eventName);
      setDivNbr(state.events.divNbr);
      setIsEditMode(true);
      setMethod("PUT");
      setPath(`updateByEventId/${state.events.eventId}`);
    }
  }, []);
  return (
    <div>
      <h4>{isEditMode ? "Update" : "Create"} Events</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Division Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Division number"
            value={divNbr}
            onChange={(val) => setDivNbr(val.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            required
            value={eventName}
            onChange={(val) => {
              setEventName(val.target.value);
            }}
          />
        </Form.Group>

        <div style={{ paddingTop: "15px" }}>
          <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
        </div>
      </Form>

      {alertFlag && (
        <div style={{ paddingTop: "10px" }}>
          <Alert
            variant={alertVariant}
            onClose={() => setAlertFlag(false)}
            dismissible
          >
            <Alert.Heading>Message</Alert.Heading>
            <p>{alertMessage && alertMessage}</p>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Events;
