import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

//Component Imports
import Appointment from "components/Appointment/index.js"
import Button from "components/Button";
import Confirm from "components/Appointment/Confirm";
import DayList from "components/DayList";
import DayListItem from "components/DayListItem";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

//Dummy Data
import days from "data/days.js";
import interviewer from "data/interviewer.js";
import interviewers from "data/interviewers.js";
import { actions, withActions } from "@storybook/addon-actions/dist/preview";

// Button Stories
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  // DayListItem Stories
  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ))
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />); // To define our stories, we call add() once for each of our test states to generate a story

  //DayList Stories
  storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

  //InterviewerListItem Stories
  storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ));


  //InterviewerList Stories
  storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("onChange")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("onChange")}
    />
  ));

  //Appointment Stories
  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment", () => <Appointment time="12pm"/>)
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer: interviewer.name }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Confirm", () =>
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  )
  .add("Error", () =>
    <Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />
  )
  .add("Empty", () => <Empty onAdd={action("onAdd")}/>)
  .add("Form - Creation", () =>
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  )
  .add("Form - Editing", () =>
    <Form
      name="Ryan Reynolds"
      interviewers={interviewers}
      value={2}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  )
  .add("Header", () => <Header time="12pm"/>)
  .add("Show", () =>
    <Show
      student="Lydia-Miller Jones"
      interviewer={interviewer.name}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  )
  .add("Status", () => <Status message="Deleting" />);
