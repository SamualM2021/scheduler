import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

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
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
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
          value={props.value}
          onChange={event => setInterviewer(event.target.value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
