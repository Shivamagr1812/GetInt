import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const Navbar = ()=>{

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    console.log("Working Fine");
    return (
        <nav>
            <div className="title"><Link to="/about" ><img src={require('./assets/logos/png/logo-white-no-bg.png')} alt="GetIntern" /></Link></div>
            <nav className="navbar" ref={navRef}>
                <Link to="/" className="home">Home</Link>
                <Link to="/interns">Available Internships</Link>
                <Link to="/new-intern">Add Internship</Link>
                {/* <Link to="/register">Login/Register</Link> */}
                <Link to="/login">Login/Register</Link>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars/>
            </button>
        </nav>
    );
}

export default Navbar;
