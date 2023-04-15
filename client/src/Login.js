
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        axios.post("https://get-intern.onrender.com/login",{
            userName,
            password
        }).then((res)=>{
            const token=res.data.token
            setAuthToken(token);
        })
        const path=`/`
        navigate(path)
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
                
            <button onClick={addToList}>Login</button>
        </div>
    );
}

export default Login;