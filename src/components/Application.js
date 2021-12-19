import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/styles/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";

//Dummy data
import appointments from "data/appointments.js";

const MONDAY = "Monday";
const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function Application(props) {
  const [state, setState] = useState({
    day: MONDAY,
    days: [],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({...prev, days }));

  const scheduledAppointments = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment}/>
  });

  useState(() => {
    axios.get(daysURL).then(response => {
      setDays(response.data);
    })
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
