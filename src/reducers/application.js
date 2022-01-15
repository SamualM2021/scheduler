/**
 * This is the state management for the application
 * - setDay given the current state it will set the current day
 * - updateAppointments given the current state will do an update on
 * the appointment given an id and an interview and will either reduce or increase
 * the spots available
 * - setResponseData this manages the state of the response for days, appointments
 * and interviewers
 * - setSpots Sets the spots for a given day
 */
const reducers = {
  setDay(state, action) {
    return { ...state, day: action.value };
  },
  updateAppointments(state, action) {
    let actionID = action.id;
    let actionInterview = action.interview;
    let today = state.days.find(day => day.appointments.includes(actionID));
    if (actionInterview) {
      today.spots -= 1;
      const updateAppointment = {
        ...state.appointments[actionID],
        interview: {...actionInterview}
      }
      const bookedAppointments = {
        ...state.appointments,
        [actionID]: updateAppointment
      };
      let appDaysArray = [...state.days];
      appDaysArray[today.id -1] = today;
      return { ...state, appointments: bookedAppointments, days: appDaysArray };
    } else {
      today.spots += 1;
      const updateAppointment = {
        ...state.appointments[actionID],
        interview: null
      }
      const bookedAppointments = {
        ...state.appointments,
        [actionID]: updateAppointment
      };
      let appDaysArray = [...state.days];
      appDaysArray[today.id -1] = today;
      return { ...state, appointments: bookedAppointments, days: appDaysArray };
    }
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

export default reducer;
