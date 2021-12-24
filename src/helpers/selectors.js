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

export function getInterviewersForDay(state, day) {

  let everyDay = state.days;
  let bookedInterviewers; //track the interviewers on each day

  //Handle an empty days state
  if(everyDay.length < 1) {
    return [];
  }

  //Retrieves booked interviewers for day
  for(const today of everyDay){
    if(today.name === day){
      bookedInterviewers = today.interviewers;
    }
  }

  //Do we have booked interviewers?
  if(!bookedInterviewers) {
    return []; //No... return nothing
  }

  //Grab the interviewer of each interviewers of the current day using the ids
  let selectedInterviewers = [];
  for (const id of bookedInterviewers) {
    let selectedInterviewer = state.interviewers[id];
    selectedInterviewers.push(selectedInterviewer);
  }

  return selectedInterviewers;
}

export function getInterview(state, interview) {
  let interviewers = state.interviewers;
  let selectedInterview = {};

  //Interview is empty
  if (!interviewers || !interview) {
    return null;
  }

  // Iterate through the interviewers ids
  for(const key of Object.keys(interviewers)) {
    let newInterviewer = interviewers[key];
    if (newInterviewer.id === interview.interviewer) {
      selectedInterview["interviewer"] = newInterviewer;
      selectedInterview["student"] = interview.student;
    }
  }

  return selectedInterview;
}
