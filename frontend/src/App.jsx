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
import { BreatheIntro } from './pages/BreatheIntro';
import { Breathe } from './pages/Breathe';
import { SocialInteractions } from './pages/SocialInteractions';
import { EditFlower } from './pages/EditFlower';
import { Affirmations } from './pages/Affirmations';
import { Awards } from './pages/Awards';

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
            <Route path="/breatheIntro" element={<BreatheIntro/>}/>
            <Route path="/breathe/:start/:middle/:end" element={<Breathe/>}/>
            <Route path="/socialInteractions" element={<SocialInteractions/>}/>
            <Route path="/editFlower/:id" element={<EditFlower/>}/>
            <Route path="/affirmations" element={<Affirmations/>}/>
            <Route path="/awards" element={<Awards/>}/>

          </Route>
        </Route>
      </Routes>

    </Router>

    </>
  )

}

export default App
