import React from "react";

import "components/styles/InterviewerListItem.scss"
import classNames from "classnames";

const InterviewerListItem = props => {
  let interviewListItemClass = classNames({
    "interviewers__item" : true,
    "interviewers__item--selected": props.selected
 });

  return (
    <li key= {props.id} className={interviewListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}

export default InterviewerListItem;
