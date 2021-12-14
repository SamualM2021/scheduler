import React from "react";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import "components/styles/Appointment.scss";

/**
* Appointment Overview
*  Appointment takes the following props
* - time: A string representing the time of the appointment
* - interview (Optional): An object representing the interview
* @param {*} props
* @returns
*/
const Appointment = props => {
  const interview = props.interview;
  return (
    <article className="appointment">
      <h1>{props.time}</h1>
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
  );
}

export default Appointment;
