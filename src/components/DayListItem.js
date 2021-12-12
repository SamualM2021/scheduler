import React from "react";

import "components/styles/DayListItem.scss";
import classNames from "classnames";

const formatSpots = spots => {
  if (spots === 0) {
    return "no spots remaining"; //NO SPOTS
  } else if (spots === 1) {
    return `${spots} spot remaining`; //ONE SPOT
  } else if(spots > 1) {
    return `${spots} spots remaining`; //MULTIPLE SPOTS
  }
};

export default function DayListItem(props) {
  let dayListItemClass = classNames({
    "day-list__item" : true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots || props.spots === 0
 });

  const spotDetailMessage = formatSpots(props.spots);
  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotDetailMessage}</h3>
    </li>
  );
}
