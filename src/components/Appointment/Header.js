import React from "react";

/*
* Header Overview
*  Header takes the following props
* - time: A string representing the time of the booking
*/
const Header = props => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}

export default Header;
