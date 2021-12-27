import React, {useEffect} from "react";

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
  const interviewers = props.interviewers;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW);
    }
    if (mode === SHOW && !interview) {
      transition(EMPTY);
    }
  }, [interview, mode, transition]);

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteAppointment() {

    if (mode === CONFIRM) {
      transition(DELETING, true);
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <h1>{props.time}</h1>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={deleteAppointment}
          onEdit={edit}
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
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message="Are you sure you would like to delete the appointment?"
        />}
      {mode === EDIT &&
        <Form
          name={props.name ? props.name : interview.student}
          value={props.value ? props.value: interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Could not create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Could not cancel appointment"
          onClose={back}
        />
      }

    </article>
  );
}

export default Appointment;
