import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/styles/InterviewerList.scss";
import PropTypes from "prop-types";

/*
* InterviewerList Overview
*  InterviewerList takes the following props
* - interviewers: An array of objects representing the available interviewers
  for booking an appointment
* - onChange: A callback that will do something on a change action
* - value (Optional): A number indicating the selected interviewer from the list
*/
const InterviewerList = props => {
  const interviewers = props.interviewers;
  const interviewerItemList = interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)} />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItemList}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;
