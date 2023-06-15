import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const Home = ()=>{

    const navigate = useNavigate();
    
    const goToAvInt=()=>{
        const path=`/interns`
        navigate(path)
    }

    const goToAddInt=()=>{
        const path=`/new-intern`
        navigate(path)
    }

    return (
        <div className="homePage">
            <div className="welcome">
                <div className="dialogBox">
                    <h1>Land the Internship of Your Dreams</h1>
                    
                    <h2>Choose your role</h2>
                    <div className="option">
                        <div className="stud">
                            <button onClick={goToAvInt}><FaGraduationCap className="icon"/>Student</button>
                            <p>Discover the perfect internship role that matches your skills and interests, and kickstart your career with some hands-on experience. Our platform connects ambitious students with exciting companies eager to bring fresh talent on board.
                            </p>
                        </div>
                        <div className="emp">
                            <button onClick={goToAddInt}><FaBriefcase className="icon"/>Employer</button>
                            <p>For businesses, it's a chance to attract bright, driven individuals ready to make an impact. Mentor the next generation of professionals and elevate your company's innovation potential by hosting internships.
                            </p>
                        </div>    
                    </div>
                </div>
            </div>
            
            <div className="homeImg"><img src={require('./assets/img/laptop-boy.png')} alt="" /></div>
        </div>
    );
}

export default Home;