import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/common/PrivateRoutes';
import Favorite from './pages/Favorite';
import PodcastsPage from './pages/Podcasts';
import AudioPlayer from './components/common/AudioPlayer'; // Import the AudioPlayer component

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        {/* Render the AudioPlayer component outside the Routes */}
        <AudioPlayer /> 
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
