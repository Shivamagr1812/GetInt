import { Link } from "react-router-dom";

const Navbar = ()=>{
    console.log("Working Fine");
    return (
        <nav>
            <div className="title tooltip"><Link to="/about" >GetIntern</Link></div>
            
            <ul className="navbar">
                <Link to="/">Home</Link>
                <Link to="/interns">Available Internships</Link>
                <Link to="/new-intern">Add Internship</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </ul>
        </nav>
    );
}

export default Navbar;

