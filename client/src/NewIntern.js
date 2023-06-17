import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewIntern = () => {
    const [loggedin,setLoggedin]=useState(false);

    const [companyName,setCompanyName] = useState("");
    const [jobRole,setJobRole] = useState("");
    const [stipend,setStipend] = useState(0);
    const [cutoff,setCutoff] = useState(0);
    
    const navigate = useNavigate();

    const addToList = () =>{
        console.log("button working!!")
        axios.post("http://localhost:3001/insert",{
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

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((response)=>{
            const status=response.status
            console.log(status)
            if(status===200){
                setLoggedin(true);
            }
            console.log(loggedin)
        })
    },[loggedin])

    const goToLogin=()=>{
        const path=`/login`
        navigate(path)
    }

    console.log("New intern is accessed!")
    return (
        <div className="newIntern">
            {loggedin ?
                <div className="details">
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
                :
                <div className="login">
                    <h2>Please log in</h2>
                    <button onClick={goToLogin}>Login</button>
                </div>
                }
        </div>
    );
}

export default NewIntern;