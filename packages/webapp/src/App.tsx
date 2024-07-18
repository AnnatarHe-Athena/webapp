import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../../network/apollo";
import store from "./store/index";
import routes from "./routes/route";
import "./styles/index.styl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tippy/dist/tippy.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
      <ToastContainer position='bottom-right' />
      <Toaster position='bottom-right' />
    </ApolloProvider>
  );
};

export default App;
