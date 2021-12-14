import React from 'react';
import DayListItem from './DayListItem';

/*
* DayList Overview
*  DayList takes the following props
* - days: An array of day objects
* - day: A string representing the current day
* - setDay: A callback that will do something to set the day
*/
const DayList = props => {
  const days = props.days;
  const dayItemList = days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  );

  return (
    <ul>
      {dayItemList}
    </ul>
  );
}

export default DayList;
