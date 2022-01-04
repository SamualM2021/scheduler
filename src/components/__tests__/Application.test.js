import React from "react";

import { render, cleanup, fireEvent, wait, waitForElement, prettyDOM, getByText,
  getByAltText, getByPlaceholderText } from "@testing-library/react";

import axios from "__mocks__/axios";
import Application from "components/Application";

afterEach(cleanup);

axios.defaults.baseURL = "http://localhost:8001";

it("defaults to Monday and changes schedule when a new day is selected", async () => {
  const { getByText } = render(<Application/>);

  await wait(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();

});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  console.log(prettyDOM(appointments));
});
