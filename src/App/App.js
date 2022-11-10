import './app.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Home from "../pages/Home";
import PageNotFound from '../pages/PageNotFound';


function App () {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
