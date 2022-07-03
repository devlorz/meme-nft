import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initContract } from "./utils";
import { MantineProvider } from "@mantine/core";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <MantineProvider
        theme={{
          fontFamily: "Verdana, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: { fontFamily: "Greycliff CF, sans-serif" },
        }}
      >
        <App />
      </MantineProvider>,
      document.querySelector("#root")
    );
  })
  .catch(console.error);
