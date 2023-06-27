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
            <div className="intro">
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

                <div className="homeImg">
                    <img src={require('./assets/img/laptop-boy.png')} alt="" />
                </div>
            </div>
            <div className="process">
                <h2>Follow three simple steps:</h2>
                <div className="steps">
                    <div className="step1">
                        <img className="registerPic" src={require('./assets/img/login.png')} alt="login" />
                        <header><h2>Register on our platform</h2></header>
                        <p>
                        Join our platform and unlock a world of opportunities. Register now and access the features. Whether you're a professional or a student, our platform is designed to help you.
                        </p>
                    </div>
                    <div className="step2">
                        <img className="choicePic" src={require('./assets/img/choice.png')} alt="login" />
                        <header><h2>Choose from available internships</h2></header>
                        <p>
                        With our platform, the power of choice is in your hands. Select the internship that best suits you from a diverse array of options spanning various domains.  
                        </p>
                    </div>
                    <div className="step3">
                        <img className="resumePic" src={require('./assets/img/submit.png')} alt="login" />
                        <header><h2>Submit your resume</h2></header>
                        <p>
                        Attach your impressive resume and submit the form, and voila! You're all set and ready to embark on your journey.
                        </p>
                    </div>
                </div>
            </div>
            <div className="team">
                <h2>Meet the Team</h2>
                <div className="teamMembers">
                    <div className="member">
                        <img src={require('./assets/img/amrisha.jpg')} alt="login" />
                        <h3>Amrisha Vardiya</h3>
                    </div>
                    <div className="member">
                        <img src={require('./assets/img/shivam.jpg')} alt="login" />
                        <h3>Shivam Agrawal</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;