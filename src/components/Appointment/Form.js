import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const DEFAULT_NAME = "";
const DEFAULT_INTERVIEWER = null;
/*
* Form Overview
*  Form takes the following props
* - interviewers: An array of objects representing the available interviewers
  for booking an appointment
* - onCancel: A callback that will do something on a cancel action
* - onSave: A callback that will do something on a save action
* - name (Optional) used when editing an existing form
* - value (Optional) an Integer representing the selected interviewer's id
  used when editing a form
*/
const Form = props => {
  const [name, setName] = useState(props.name || DEFAULT_NAME);
  const [interviewer, setInterviewer] = useState(props.value || DEFAULT_INTERVIEWER)

  const interviewers = props.interviewers;
  const reset = () => {
    setName(DEFAULT_NAME);
    setInterviewer(DEFAULT_INTERVIEWER);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={event => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
