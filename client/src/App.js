import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import Launches from "./components/Launches";
import Launch from "./components/Launch";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <div className="container">
          <h1>SpaceX</h1>
          <Switch>
            <Route exact path="/" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
