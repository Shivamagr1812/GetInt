import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modals/Modal";

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

    // Apply button
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    };

    return(
        <div className="available">
            {loggedin? <div className="list">
                <h1>Internships for you</h1>
                <div className="listJobs">
                    {internList.map((val,key) => {
                        return(
                            <div key={key} className="block">
                                <div className="data">
                                    <h2>{val.CompanyName}</h2>
                                    <div><span>Job Role: </span>{val.JobRole}</div>
                                    <div><span>Stipend: </span>{val.Stipend}</div>
                                    <div className="last" ><span>Cutoff: </span>{val.CutOff}</div>
                                </div>
                                <div className="apply">
                                    <button onClick={openModal} className="applyButton">Apply</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Modal trigger={showModal} setTrigger={setShowModal}>
                </Modal>
            </div> : <div className="login">
                        <h2>Please log in</h2>
                        <button onClick={goToLogin}>Login</button>
                    </div>}        
        </div>
    )
}

export default AvIntern;