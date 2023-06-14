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
                    <h1>Welcome!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae repellendus quis commodi alias aut iste labore sed quaerat, provident voluptatibus delectus obcaecati consequatur sint atque culpa inventore? Facere, ex sit!</p>
                    <h2>Choose your role</h2>
                    <div className="option">
                            <button onClick={goToAvInt}><FaGraduationCap className="icon"/>Student</button>
                            <button onClick={goToAddInt}><FaBriefcase className="icon"/>Employer</button>
                    </div>
                </div>
            </div>
            
            {/* <div className="homeImg"><img src={require('./assets/img/img-intern.jpg')} alt="" /></div> */}
        </div>
    );
}

export default Home;