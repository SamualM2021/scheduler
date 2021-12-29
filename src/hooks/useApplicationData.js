import {useState, useEffect} from "react";
import axios from 'axios';

const MONDAY = "Monday";
const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function useApplicationData(props) {

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

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
    });
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(response => {
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
