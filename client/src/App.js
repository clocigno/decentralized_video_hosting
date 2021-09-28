import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header.js';
import NavBar from './components/NavBar.js';
import Main from './components/Main.js';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

function App() {
  document.title = 'Odysee';

  TimeAgo.addDefaultLocale(en);

  return (
    <Router>
      <div style={{display: 'flex'}} >
        <Header />
        <NavBar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
