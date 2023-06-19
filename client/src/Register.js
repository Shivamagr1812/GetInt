import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ()=>{

    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const addToList = () =>{
        console.log("button working!!")
        axios.post("http://localhost:3001/register",{
            userName,
            password
        });
        const path=`/login`
        navigate(path)
        // setCompanyName("");
        // setJobRole("");
        // setStipend(0);
        // setCutoff(0);
    }

    const goToLogin=()=>{
        const path=`/login`
        navigate(path)
    }

    return (
        <div className="details">
            <div className="fields">
                <h2>Register</h2>
                <div className="form">
                    <div className="inputBox">
                        <input type="text" value={userName} onChange={(e)=>{
                            setUserName(e.target.value);
                        }}/>
                        <label>Username</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/> 
                        <label>Password</label>
                    </div>
                    <button className="btn" onClick={addToList}>Register</button>
                    <div className="wannaSwitch">
                        <p>Already Registered? <button onClick={goToLogin}>Login</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;