import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import ParticipantList from './Components/Pages/ParticipantList'
import AddParticipant from "./Components/Pages/AddParticipant";
import ChangeList from "./Components/Pages/ChangeList";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Routes>
                <Route exact path="/" element={<ParticipantList />} />
                <Route exact path={`/add`} element={<AddParticipant />} />
                <Route exact path="/changes" element={<ChangeList />} />
            </Routes>
        </div>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
