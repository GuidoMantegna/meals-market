import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// // PROVIDER
// import { Provider } from "react-redux";
// // REDUCERS
// import rootReducer from "state/reducers";
// // MIDDLEWARES
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// // const container = document.getElementById("root");
// // if (!container) throw new Error("Failed to find the root element");
// // const root = ReactDOM.createRoot(container);

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, logger))
// );

test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})
