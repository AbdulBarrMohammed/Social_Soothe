import { useState, useEffect } from 'react'
//import { getJournal, getJournals, createJournal, updateJournal, deleteJournal } from './controller'
import React from 'react'

import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { Landing } from './pages/Landing';
import { SignUp } from './components/SignUp';
import {Layout} from "./components/Layout"
import { Journals } from "./pages/Journals"
import { LogIn } from './components/Login';
import { LayoutLoggedIn } from './components/LayoutLoggedIn';
import { CreateJournal } from './pages/CreateJournal';
import { SelectedJournal } from './pages/SelectedJournal';




function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route element={<LayoutLoggedIn/>}>
            <Route path="/journals" element={<Journals/>}/>
            <Route path="/createJournal" element={<CreateJournal/>}/>
            <Route path="/selectedJournal/:id" element={<SelectedJournal/>}/>

          </Route>
        </Route>
      </Routes>

    </Router>

    </>
  )

}

export default App
