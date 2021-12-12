import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/styles/InterviewerList.scss";

const InterviewerList = props => {
  const interviewers = props.interviewers;
  const interviewerItemList = interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer} />
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

export default InterviewerList;
