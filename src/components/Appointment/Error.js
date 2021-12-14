import React from "react";

/*
* Error Overview
*  Error takes the following props
* - message: A string representing the error message we want to show
* - onClose: A callback that will do something on a close action
*/
const Error = props => {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}

export default Error;
