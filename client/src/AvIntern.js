import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvIntern = ()=>{

    const [internList,setInternList] = useState([])
    const [loggedin,setLoggedin]=useState(false);
    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((response)=>{
            const status=response.status
            console.log(status)
            if(status===200){
                setLoggedin(true);
                setInternList(response.data)
            }
            console.log(loggedin)
        })
    },[loggedin])

    const navigate=useNavigate();

    const goToLogin=()=>{
        const path=`/login`
        navigate(path)
    }

    return(
        <div className="available">
            <h1>Internships for you</h1>
            {loggedin? <div className="list">
                {internList.map((val,key) => {
                    return(
                        <div key={key} className="block">
                            <div className="data">
                            <h2>{val.CompanyName}</h2>
                            <div><span>Job Role: </span>{val.JobRole}</div>
                            <div><span>Stipend: </span>{val.Stipend}</div>
                            <div><span>Cutoff: </span>{val.CutOff}</div>
                            </div>
                            <div className="apply">
                                <button className="applyButton">Apply</button>
                            </div>
                        </div>
                    )
                })}
            </div> : <div className="login">
                        <h2>Please log in</h2>
                        <button onClick={goToLogin}>Login</button>
                    </div>}
            
        </div>
    )
}

export default AvIntern;