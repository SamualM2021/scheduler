const appointmentsURL = "http://localhost:8001/appointments";

export function getAppointmentsForDay(state, day) {

  //Handle an empty days state
  if(!state.days) {
    return [];
  }

  let currentDay = state.days.filter(currentDay => currentDay.name === day)[0];

  //Do we have appointments?
  if(!currentDay) {
    return []; //No... return nothing
  }

  //Grab the appointment of each appointment of the current day using the ids
  let selectedAppointments = [];
  for (const id of currentDay.appointments) {
    const selectedAppointment = state.appointments[id];
    selectedAppointments.push(selectedAppointment);
  }

  return selectedAppointments;
}
