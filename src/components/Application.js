import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/styles/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import {getAppointmentsForDay,getInterviewersForDay, getInterview} from "../helpers/selectors"
import interviewer from "data/interviewer";

const MONDAY = "Monday";
const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function Application(props) {
  const [state, setState] = useState({
    day: MONDAY,
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then(response => {
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
    })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const scheduledAppointments = dailyAppointments.map(appointment => {
    //const interview = getInterview(state, appointment.interview);
    return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interviewers={interviewers}
        />
      )
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
