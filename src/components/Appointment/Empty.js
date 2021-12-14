import React from "react";

/*
* Empty Overview
*  Empty takes the following props
* - onAdd: A callback that will add an appointment
*/
const Empty = props => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}

export default Empty;
