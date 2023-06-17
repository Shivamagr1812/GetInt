import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ()=>{

    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const addToList = () =>{
        console.log("button working!!")
        axios.post("https://get-intern.vercel.app/register",{
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

    return (
        <div className="details">
            <div className="fields">
                <div>
                    <label>Username</label>
                    <input type="text" value={userName} onChange={(e)=>{
                        setUserName(e.target.value);
                    }}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/> 
                </div>
            </div>
                
            <button onClick={addToList}>Register</button>
        </div>
    );
}

export default Register;