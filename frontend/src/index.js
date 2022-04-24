import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ParticipantList from './Components/Pages/ParticipantList'
import ChangeList from "./Components/Pages/ChangeList";
import MainPage from "./Components/Pages/MainPage";
import Task1 from "./Components/Pages/Task1";
import Task2 from "./Components/Pages/Task2";
import Questionnaire from "./Components/Pages/Questionnaire";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/participants" component={ParticipantList}>
                {/*<Route exact path={`/participants/add`} component={AddParticipant} />*/}
            </Route>
            <Route exact path="/changes" component={ChangeList}>
                {/*<Route exact path="/changes/:changeId" component={ChangeDetail} />*/}
            </Route>
            <Route exact path="/task1" component={Task1}>
            </Route>
            <Route exact path="/task2" component={Task2}>
            </Route>
            <Route exact path="/questionnaire" component={Questionnaire}>
            </Route>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
