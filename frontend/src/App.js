import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import MainPage from "./Components/Pages/MainPage";
import Login from "./Components/Pages/Login";
import ParticipantList from "./Components/Pages/ParticipantList";
import ChangeList from "./Components/Pages/ChangeList";
import TaskA from "./Components/Pages/TaskA";
import TaskB from "./Components/Pages/TaskB";
import Questionnaire from "./Components/Pages/Questionnaire";
import React from "react";
import {ProvideAuth} from "./auth";
import EndPage from "./Components/Pages/EndPage";



function App() {
  return (
      <ProvideAuth>
          <BrowserRouter>
              <Switch>
                  <PrivateRoute exact path="/" component={MainPage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/participants" component={ParticipantList}>
                  </Route>
                  <Route exact path="/changes" component={ChangeList}>
                  </Route>
                  <PrivateRoute path="/taskA" component={TaskA}>
                  </PrivateRoute>
                  <PrivateRoute exact path="/taskB" component={TaskB}>
                  </PrivateRoute>
                  <PrivateRoute exact path="/questionnaire" component={Questionnaire}>
                  </PrivateRoute>
                  <PrivateRoute exact path="/end" component={EndPage}>
                  </PrivateRoute>
              </Switch>
          </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
