import React from "react";

import "components/styles/InterviewerListItem.scss"
import classNames from "classnames";

/*
* InterviewerListItem Overview
*  InterviewerListItem takes the following props
* - id: A number representing the id of the interviewer
* - name: A String representing the name of the interviewer
* - avatar: A string representing the image path of the avatar
* - selected : A boolean flag that will conditionally apply the selected css class
* - setInterviewer: A callback that will set the selected interviewer
*/
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
