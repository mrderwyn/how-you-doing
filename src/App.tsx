import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import PeoplesPage from './pages/PeoplesPage';
import PostPage from './pages/PostPage';

import logo from './logo.svg';
import './App.css';

import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

function App() {

  return (
    
    <Router>
      <div className='App'>
        <div className='Container'>
          <div className='MenuContainer'>
            <Menu />
          </div>
            <div className='MainContainer'>
              <Routes>
                <Route path='/' element={<FeedPage />} />
                <Route path='profile/:id' element={<ProfilePage />} />
                <Route path='peoples/:id' element={<PeoplesPage />} />
                <Route path='post/:id' element={<PostPage />} />
              </Routes>
              <ScrollToTopButton />
            </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
