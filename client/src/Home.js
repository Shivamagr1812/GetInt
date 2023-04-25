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
            <div className="dialogBox">
                <header><h1>Choose your role</h1></header>
                <div className="option">
                    {/* <form > */}
                        <button onClick={goToAvInt}><FaGraduationCap className="icon"/>Student</button>
                        <button onClick={goToAddInt}><FaBriefcase className="icon"/>Employer</button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}

export default Home;