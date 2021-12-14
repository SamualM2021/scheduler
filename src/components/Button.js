import React from "react";

import "components/styles/Button.scss";
import classNames from "classnames";

/*
* Button Overview
*  Button takes the following props
* - confirm: A boolean flag to conditionally add a confirm css class
* - danger: A boolean flag to conditionally add a danger css class
* - disabled: A boolean flag to conditionally add a disabled html attribute
* - onClick: A callback that will do something on a click action
*/
export default function Button(props) {
   let buttonClass = classNames({
      "button" : true,
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return <button
     disabled={props.disabled}
     onClick={props.onClick}
     className={buttonClass}
   >
     {props.children}
   </button>;
}
