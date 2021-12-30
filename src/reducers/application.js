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
