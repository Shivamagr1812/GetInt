import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import AvIntern from './AvIntern';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import NewIntern from './NewIntern';
import Register from './Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/new-intern" element={<NewIntern/>}></Route>
            <Route path="/interns" element={<AvIntern/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
