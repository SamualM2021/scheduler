import {useReducer, useEffect} from "react";
import axios from 'axios';

import reducer from "../reducers/application";

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

      //Websocket set up
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };

      //On message from server, update state with interview
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

          dispatch({ type: "updateAppointments", id: appointment.id, interview: appointment.interview});
        }
      };
    })
  }, []);

  /**
   * Book an interview within the scheduler app
   * @param {integer} id
   * @param {Object} interview
   * @returns
   */
  function bookInterview(id, interview) {
    // Add our interview as a new appointment for the day to our "back-end"
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
    });
  }

  /**
   * Cancels an interview within the scheduler app
   * @param {*} id
   * @returns
   */
  function cancelInterview(id) {
    //Removes an interview appointment for the day from our "back-end"
    return axios.delete(`/api/appointments/${id}`).then(response => {
    });
  }


  return {state, setDay, bookInterview, cancelInterview };
}
