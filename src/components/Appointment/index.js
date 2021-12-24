import React from "react";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import "components/styles/Appointment.scss";
import useVisualMode from "hooks/useVisualMode";

/**
* Appointment Overview
*  Appointment takes the following props
* - time: A string representing the time of the appointment
* - interview (Optional): An object representing the interview
* @param {*} props
* @returns
*/
const Appointment = props => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const interview = props.interview;
  const interviewers = [];
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <h1>{props.time}</h1>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interview={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

    </article>
  );
}

export default Appointment;
