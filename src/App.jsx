import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import GitHubGraph from './components/GitHubGraph/GitHubGraph';
import DevNotes from './components/DevNotes/DevNotes';
import Footer from './components/Footer/Footer';

function App() {
  const [mobileView, setMobileView] = useState('main'); // 'main', 'github', 'notes'

  const handleNavigate = (sectionId, view = 'main') => {
    setMobileView(view);

    // Slight delay to allow view switch before scrolling if needed
    if (sectionId && view === 'main') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="app" id="home">
      <Navbar onNavigate={handleNavigate} currentView={mobileView} />

      <div className="main-content">
        {/* Left Panel - Main Content */}
        <div className={`left-panel ${mobileView !== 'main' ? 'mobile-hidden' : ''}`}>
          <div className="left-panel-content">
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="experience"><Experience /></section>
          </div>
        </div>

        {/* Right Panel - Sidebar Content */}
        <div className="right-panel">
          <div className={`right-panel-item ${mobileView !== 'github' ? 'mobile-hidden' : ''} ${mobileView === 'github' ? 'mobile-only-view' : ''}`}>
            <section id="github-activity"><GitHubGraph /></section>
          </div>
          <div className={`right-panel-item ${mobileView !== 'notes' ? 'mobile-hidden' : ''} ${mobileView === 'notes' ? 'mobile-only-view' : ''}`}>
            <section id="dev-notes"><DevNotes /></section>
          </div>
        </div>
      </div>

      <div className={`${mobileView !== 'main' ? 'mobile-hidden' : ''}`}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
