
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const addToList = () =>{
        console.log("button working!!")
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
                    <input type="text" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/> 
                </div>
            </div>
                
            <button onClick={addToList}>Login</button>
        </div>
    );
}

export default Login;