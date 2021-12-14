import React from "react";

import Button from 'components/Button';

/*
* Confirm Overview
*  Confirm takes the following props
* - message: A string representing the confirmation message we want to show
* - onCancel: A callback that will do something on a cancel action
* - onConfirm: A callback that will do something on a cancel action
*/
const Confirm = props => {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}

export default Confirm;
