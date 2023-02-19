import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainMenu from './components/menu/main_menu/MainMenu';
import StartScreen from './components/menu/start_screen/StartScreen';
import StartView from './components/menu/StartView';
import './App.css';
import SongSelect from './components/menu/song_select/SongSelect';
import GeneralAudioProvider from './providers/GeneralAudioProvider';
import SongOptions from './components/menu/song_select/song_options/SongOptions';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <GeneralAudioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StartView />}>
              <Route path="" element={<StartScreen />} />
              <Route path="menu" element={<MainMenu />} />
            </Route>
            <Route path="/songs" element={<SongSelect />} />
            <Route path="/songTest" element={<SongOptions />} />
          </Routes>
        </Router>
      </GeneralAudioProvider>
    </Provider>
  );
}

export default App;
