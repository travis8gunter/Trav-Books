import './main.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavContainer from './navbar/nav-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Menu from './pages/menu';
import NoMatch from './pages/no-match';
import Footer from './pages/footer';

// Importing the new category pages
import History from './pages/history';
import Science from './pages/science';
import Tech from './pages/tech';
import Philosophy from './pages/philosophy';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavContainer />
        </header>
        <main>
          {/* Routes and NavBar items */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category/history' element={<History />} />
            <Route path='/category/science' element={<Science />} />
            <Route path='/category/tech' element={<Tech />} />
            <Route path='/category/philosophy' element={<Philosophy />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
          {/* End of Routes and NavBar items */}
        </main>
        <Footer />
      </div>
    </Router>  
  );
}

export default App;

