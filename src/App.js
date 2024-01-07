import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import './main.scss';
import NavContainer from './navbar/nav-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Menu from './pages/menu';
import NoMatch from './pages/no-match';
import Footer from './pages/footer';
import Auth from './pages/auth';
import CrudComponent from './pages/crud-component';

// Import the new category pages
import History from './pages/history';
import Science from './pages/science';
import Tech from './pages/tech';
import Philosophy from './pages/philosophy';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavContainer />
          {isAdminAuthenticated && (
            <>
              <Link to="/admin">Admin Page</Link> {/* */}
              <button onClick={() => setIsAdminAuthenticated(false)}>Logout</button>
            </>
          )}
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth onAdminLogin={setIsAdminAuthenticated} />} />
            {isAdminAuthenticated && <Route path="/admin" element={<CrudComponent />} />}
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category/history' element={<History />} />
            <Route path='/category/science' element={<Science />} />
            <Route path='/category/tech' element={<Tech />} />
            <Route path='/category/philosophy' element={<Philosophy />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>  
  );
}

export default App;