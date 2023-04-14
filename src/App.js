import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/Home';
import AboutMePage from './components/About';
import PortfolioPage from './components/Portfolio';
import BackgroundAnimation from './BackgroundAnimation';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState('theme1');

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  return (
    <div className={`${currentTheme}`}>
      <BackgroundAnimation theme={currentTheme} />
      <Router>
        <NavBar changeTheme={changeTheme} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
