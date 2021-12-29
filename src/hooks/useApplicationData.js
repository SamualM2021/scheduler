import {useReducer, useEffect} from "react";
import axios from 'axios';

const MONDAY = "Monday";
const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

/**
 * This custom hook is responsible for our application data and the management
 * of it's state
 * @returns
 */
export default function useApplicationData() {

  const reducers = {
    setDay(state, action) {
      return { ...state, day: action.value };
    },
    updateAppointments(state, action) {
      return { ...state, appointments: action.value };
    },
    setResponseData(state, action) {
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    },
    setSpots(state, action) {
      let appDaysArray = [...state.days];
      appDaysArray[action.dayPosition].spots = action.value;
      return {
        ...state,
        days: appDaysArray
      }
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

  /**
   * Sets the state of our day
   * @param {Object} day The object containing information about the day
   * @returns
   */
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

  /**
   * Book an interview within the scheduler app
   * @param {integer} id
   * @param {Object} interview
   * @returns
   */
  function bookInterview(id, interview) {
    let bookedAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    let bookedAppointments = {
      ...state.appointments,
      [id]: bookedAppointment
    };

    // Add our interview as a new appointment for the day to our "back-end"
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
      let today = state.days.find(day => day.name === state.day);
      dispatch({type: "setSpots", value: today.spots - 1, dayPosition: today.id - 1});
      dispatch({ type: "updateAppointments", value: bookedAppointments });
    });
  }

  /**
   * Cancels an interview within the scheduler app
   * @param {*} id
   * @returns
   */
  function cancelInterview(id) {
    let cancelledAppointment = {
      ...state.appointments[id],
      interview: null
    };
    let bookedAppointments = {
      ...state.appointments,
      [id]: cancelledAppointment
    };

    //Removes an interview appointment for the day from our "back-end"
    return axios.delete(`/api/appointments/${id}`).then(response => {
      let today = state.days.find(day => day.name === state.day);
      dispatch({type: "setSpots", value: today.spots + 1, dayPosition: today.id - 1});
      dispatch({ type: "updateAppointments", value: bookedAppointments });
    });
  }

  return {state, setDay, bookInterview, cancelInterview };
}
