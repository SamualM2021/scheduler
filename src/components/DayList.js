import React from 'react';
import DayListItem from './DayListItem';

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