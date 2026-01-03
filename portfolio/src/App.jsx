import './App.css';
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import GitHubGraph from "./components/GitHubGraph/GitHubGraph";
import TwitterFeed from "./components/TwitterFeed/TwitterFeed";

function App() {
  return (
    <div className="app">
      <div className="left-panel">
        <div className="left-panel-content">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
      <div className="right-panel">
        <GitHubGraph />
        <TwitterFeed />
      </div>
    </div>
  );
}

export default App;
