import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewIntern = () => {
    const [companyName,setCompanyName] = useState("");
    const [jobRole,setJobRole] = useState("");
    const [stipend,setStipend] = useState(0);
    const [cutoff,setCutoff] = useState(0);
    
    const navigate = useNavigate();

    const addToList = () =>{
        console.log("button working!!")
        axios.post("https://get-intern.vercel.app/insert",{
            companyName,
            jobRole,
            stipend,
            cutoff
        });
        const path=`/`
        navigate(path)
        // setCompanyName("");
        // setJobRole("");
        // setStipend(0);
        // setCutoff(0);
    }

    console.log("New intern is accessed!")
    return (
        <div className="details">
            {/* <form> */}
            <div className="fields">
                <div>
                    <label>Company Name</label>
                    <input type="text" value={companyName} id="CompanyName" onChange={(e)=>{
                        setCompanyName(e.target.value);
                    }}/>
                </div>
                <div>
                    <label>Job Role</label>
                    <input type="text" value={jobRole} id="JobRole" onChange={(e)=>{
                        setJobRole(e.target.value);
                    }}/> 
                </div>
                <div>
                    <label>Stipend</label>
                    <input type="text" value={stipend} id="Stipend" onChange={(e)=>{
                        setStipend(e.target.value);
                    }}/> 
                </div>
                <div>
                    <label>Cut-Off</label>
                    <input type="text" value={cutoff} id="Cutoff" onChange={(e)=>{
                        setCutoff(e.target.value);
                    }}/> 
                </div>
            </div>
                
                <button onClick={addToList}>Submit</button>
            {/* </form> */}
        </div>
    );
}

export default NewIntern;