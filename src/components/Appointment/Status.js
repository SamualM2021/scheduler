import React from "react";

/*
* Status Overview
*  Status takes the following props
* - message: A string representing the status message we want to show
*/
const Status = props => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}

export default Status;
