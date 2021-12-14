import interviewers from "./interviewers.js";

const appointments = [
  {
    id: 1,
    time: "12pm",
  }, //Empty Appointment
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Ryan Reynolds",
      interviewer: {
        id: interviewers[0].id,
        name: interviewers[0].name,
        avatar: interviewers[0].avatar,
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  }, //Empty Appointment
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Jessica Alba",
      interviewer: {
        id: interviewers[2].id,
        name: interviewers[2].name,
        avatar: interviewers[2].avatar,
      }
    }
  },
  {
    id: 5,
    time: "4pm"
  } //Empty Appointment
];

export default appointments;
