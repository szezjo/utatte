import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainMenu from './components/menu/main_menu/MainMenu';
import StartScreen from './components/menu/start_screen/StartScreen';
import StartView from './components/menu/StartView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartView />}>
          <Route path="" element={<StartScreen />} />
          <Route path="menu" element={<MainMenu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
