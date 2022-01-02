import React from "react";

import { render, cleanup, fireEvent, wait } from "@testing-library/react";

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
