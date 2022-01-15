# 📅 Interview Scheduler


# Contents

___

- [Setup](#Setup)
- [Clips](#Clips)
- [Features](#Features)

## 💚 Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## 📺 Clips

### Switching the Days
An example clip where you'll see the appointments change as we select different days

https://user-images.githubusercontent.com/93623256/149635196-015892d6-e668-4e84-85c0-c43ac7e3e82b.mp4

### Errors
An example clip of what you get when an error occurs when saving
https://user-images.githubusercontent.com/93623256/149635194-6eb73782-a152-4fce-94b6-91426fc53c56.mp4


### Saving
An example clip of saving and deleting appointments

https://user-images.githubusercontent.com/93623256/149635267-4096f2f9-64a4-4869-9a08-369cd99b230a.mp4

## 🐾 Features

### Functional Requirements

---

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

---

### Behavioural Requirements

---

- Interviews can be booked between Monday and Friday.
-  A user can switch between weekdays.
-  A user can book an interview in an empty appointment slot.
-  Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
-  A user can cancel an existing interview.
-  A user can edit the details of an existing interview.
-  The list of days informs the user how many slots are available for each day.
-  The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.
- When a user books or cancels an interview, all connected users see the update in their browser using WebSockets.

---

## 📖References

Note when stuck on some of the functionality in my project I referred to the logic in the following scheduler repos. 

- [Natalia's Scheduler](https://github.com/yuzhakova/scheduler)
- [Andyzen's Scheduler](https://github.com/andyzen619/lighthouse-labs-scheduler)
- 
So, if there are logical similarities, please consider both [Natalia](https://github.com/yuzhakova) and [Andy Liang](https://github.com/andyzen619) as contributers 
since I was having trouble learning the material when similar example code was no longer provided at some point in the course. 
