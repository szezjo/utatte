import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainMenu from './components/menu/main_menu/MainMenu';
import StartScreen from './components/menu/start_screen/StartScreen';
import StartView from './components/menu/StartView';
import './App.css';
import SongSelect from './components/menu/song_select/SongSelect';
import BackgroundAudioPlayerProvider from './providers/BackgroundAudioPlayerProvider';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './api';

function App() {
  return (
    <>
      <BackgroundAudioPlayerProvider>
        <ApiProvider api={api}>
          <Router>
            <Routes>
              <Route path="/" element={<StartView />}>
                <Route path="" element={<StartScreen />} />
                <Route path="menu" element={<MainMenu />} />
              </Route>
              <Route path="/songs" element={<SongSelect />} />
            </Routes>
          </Router>
        </ApiProvider>
      </BackgroundAudioPlayerProvider>
    </>
  );
}

export default App;
