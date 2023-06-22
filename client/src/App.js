import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import AvIntern from './AvIntern';
import Home from './Home';
import Register from './Student/Register';
import Login from './Student/Login';
import LoginCompany from './Company/Login';
import RegisterCompany from './Company/Register';
import Navbar from './Navbar';
import NewIntern from './NewIntern';
import Footer from './Footer';
// import { useEffect } from 'react';

function App() {
  // useEffect(()=>{
  //   fetch("https://get-intern.onrender.com").then((response)=>{
  //     console.log("response")
  //     console.log(response)
  //   })
  // },[])

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
            <Route path='/registerCompany' element={<RegisterCompany/>}></Route>
            <Route path='/loginCompany' element={<LoginCompany/>}></Route>
            <Route path='*' element={<h1>404 Not Found</h1>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
