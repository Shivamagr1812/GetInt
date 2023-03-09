import { useEffect, useState } from "react";
import axios from "axios";

const AvIntern = ()=>{

    const [internList,setInternList] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((response)=>{
            setInternList(response.data)
        })
    },[])

    return(
        <div className="available">
            <h1>Internships for you</h1>
            <div className="list">
                {internList.map((val,key) => {
                    return(
                        <div key={key} className="block">
                            <h2>{val.CompanyName}</h2>
                            <div><span>Job Role: </span>{val.JobRole}</div>
                            <div><span>Stipend: </span>{val.Stipend}</div>
                            <div><span>Cutoff: </span>{val.CutOff}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AvIntern;