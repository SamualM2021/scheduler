import React, {useState} from "react";

import "components/styles/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";

//Dummy data
import days from "data/days.js";
import appointments from "data/appointments.js";

const MONDAY = "Monday";

export default function Application(props) {
  const [day, setDay] = useState(MONDAY);

  const scheduledAppointments = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment}/>
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduledAppointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
