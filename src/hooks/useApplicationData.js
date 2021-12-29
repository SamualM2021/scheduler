import {useReducer, useEffect} from "react";
import axios from 'axios';

const MONDAY = "Monday";
const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function useApplicationData(props) {

  const reducers = {
    setDay(state, action) {
      return { ...state, day: action.value };
    },
    updateAppointment(state, action) {
      return { ...state, appointments: action.value };
    },
    setResponseData(state, action) {
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    }
  }
  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    day: MONDAY,
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({type: "setDay", value: day });

  useEffect(() => {
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then(response => {
      let days = response[0].data;
      let appointments = response[1].data;
      let interviewers = response[2].data;
      dispatch({
        type: "setResponseData",
        value: { days, appointments, interviewers }
      });
    })
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(response => {
    });
  }

  return {state, setDay, bookInterview, cancelInterview };
}
