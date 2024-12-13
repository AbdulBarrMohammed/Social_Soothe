import { useState, useEffect } from 'react'
//import { getJournal, getJournals, createJournal, updateJournal, deleteJournal } from './controller'
import React from 'react'
import { motion } from 'framer-motion';


import {HashRouter as Router, Routes, Route, useLocation} from "react-router-dom";
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
import { SocialTree } from './pages/SocialTree';
import { EditFlower } from './pages/EditFlower';
import { Affirmations } from './pages/Affirmations';
import { Awards } from './pages/Awards';
import { LayoutAwards } from './components/LayoutAwards';
import { Settings } from './pages/Settings';
import { Articles } from './pages/Articles';
import { Resources } from './pages/Resources';
import { AnimatePresence } from 'framer-motion';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';

function App() {

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout/>}>
            <Route path="/" element={<PageWrapper><Landing/></PageWrapper>}/>
            <Route path="/signUp" element={<PageWrapper><SignUp/></PageWrapper>}/>
            <Route path="/login" element={<PageWrapper><LogIn/></PageWrapper>}/>
            <Route path="/articles" element={<PageWrapper><Articles/></PageWrapper>}/>
            <Route path="/resources" element={<PageWrapper><Resources/></PageWrapper>}/>
            <Route path="/about" element={<PageWrapper><About/></PageWrapper>}/>
            <Route element={<LayoutLoggedIn/>}>
              <Route path="/journals" element={<PageWrapper><Journals/></PageWrapper>}/>
              <Route path="/createJournal" element={<PageWrapper><CreateJournal/></PageWrapper>}/>
              <Route path="/selectedJournal/:id" element={<PageWrapper><SelectedJournal/></PageWrapper>}/>
              <Route path="/breatheIntro" element={<PageWrapper><BreatheIntro/></PageWrapper>}/>
              <Route path="/breathe/:start/:middle/:end" element={<PageWrapper><Breathe/></PageWrapper>}/>
              <Route path="/socialTree" element={<PageWrapper><SocialTree/></PageWrapper>}/>
              <Route path="/editFlower/:id" element={<PageWrapper><EditFlower/></PageWrapper>}/>
              <Route path="/affirmations" element={<PageWrapper><Affirmations/></PageWrapper>}/>
              <Route path="/settings" element={<PageWrapper><Settings/></PageWrapper>}/>
              <Route path="/dashboard" element={<PageWrapper><Dashboard/></PageWrapper>}/>
              <Route element={<LayoutAwards/>}>
                <Route path="/awards/:type" element={<Awards/>}/>

              </Route>



            </Route>
          </Route>
        </Routes>
      </AnimatePresence>

    </>
  )

}


function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5}}
    >
      {children}

    </motion.div>
  )
}

export default App
