import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewIntern = () => {
    const [loggedin,setLoggedin]=useState(false);

    const [applicationlist,setApplicationList] = useState([]); // To store all applications

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
    }

    // const downloadResume = (key) =>{
    //     console.log("Download button working!!")
    //     const file=applicationlist[key].Resume;
    //     const link=document.createElement("a");
    //     // const url=URL.createObjectURL(file);
    //     const filename=applicationlist[key].Name;
    //     console.log(filename);
    //     // console.log(url);
    //     console.log(file);
    //     console.log(link);
    // }


    useEffect(()=>{
        axios.get("http://localhost:3001/readApplications").then((response)=>{
            const status=response.status
            console.log("Applications read")
            if(status===200){
                setLoggedin(true);
                setApplicationList(response.data)
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
                <div>
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
                    <div className="applications">
                        <h1>Applications</h1>
                        {/* Display all appliactions from database */}
                        {applicationlist.map((val,key) => {
                            return(
                                <div key={key} className="block">
                                    <div className="data">
                                        <h2>{val.Name}</h2>
                                        <div><span>Email: </span>{val.Email}</div>
                                        <div><span>Branch: </span>{val.Branch}</div>
                                        <div><span>Role: </span>{val.Role}</div>
                                        <Link to={val.Resume} target="_blank" rel="noreferrer" >Download Resume</Link>
                                    </div>
                                </div>
                            )
                        })
                        }

                    </div>
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