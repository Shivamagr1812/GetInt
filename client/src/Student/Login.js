import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login=()=>{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
     }

    const addToList = () =>{
        console.log("button working!!")
        axios.post("http://localhost:3001/login",{
            userName,
            password
        }).then((res)=>{
            const token=res.data.token
            setAuthToken(token);
        })
        const path=`/`
        navigate(path)
    }
    
    const goToRegister=()=>{
        const path=`/register`
        navigate(path)
    }

    return (
        <div className="details">
            <div className="fields">
                <h2>Login as student</h2>
                <div className="form">
                    <div className="inputBox">
                        <input type="text" required value={userName} onChange={(e)=>{
                            setUserName(e.target.value);
                        }}/>
                        <label>Username</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" required value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/> 
                        <label>Password</label>
                    </div>
                    <button className="btn" onClick={addToList}>Login</button>
                    <div className="wannaSwitch">
                        <p>Not Registered Yet? <button onClick={goToRegister}>Register</button></p>
                    </div>
                    <Link to="/loginCompany">Login as company</Link>
                </div>
            </div>     
        </div>
    );
}

export default Login;