import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import MainPage from "./Components/Pages/MainPage";
import Login from "./Components/Pages/Login";
import ParticipantList from "./Components/Pages/ParticipantList";
import ChangeList from "./Components/Pages/ChangeList";
import Task1 from "./Components/Pages/Task1";
import Task2 from "./Components/Pages/Task2";
import Questionnaire from "./Components/Pages/Questionnaire";
import React from "react";
import {ProvideAuth} from "./auth";



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
                  <PrivateRoute exact path="/task1" component={Task1}>
                  </PrivateRoute>
                  <PrivateRoute exact path="/task2" component={Task2}>
                  </PrivateRoute>
                  <PrivateRoute exact path="/questionnaire" component={Questionnaire}>
                  </PrivateRoute>
              </Switch>
          </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
