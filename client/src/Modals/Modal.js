import React from 'react';
import { useState } from "react";
import axios from "axios";
import './Modals.css';
import { FaBars, FaTimes } from "react-icons/fa";


function Modal(props) {
    const closeModal = () => {
        props.setTrigger(false);
    }

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [branch,setBranch] = useState("");
    const [role,setRole] = useState("");
    // const [resume,setResume] = useState("");

    const fileInput=React.createRef();

    const submitForm = (e) => {
        e.preventDefault();
        const data=new FormData();
        console.log(fileInput.current.files[0]);
        data.append('resume',fileInput.current.files[0]);
        data.append('name',name);
        data.append('email',email);
        data.append('branch',branch);
        data.append('role',role);
        axios.post("http://localhost:3001/apply",data,{headers: {'Content-Type':'multipart/form-data'}}).then((res)=>{
            console.log("Form Submitted");
            // console.log(res);
        })
        closeModal();
    }

  return (props.trigger) ? (
    <div className='popup'>
        <div onClick={closeModal} className="overlay"></div>
        <div className='popup-inner'>
            <button onClick={closeModal} className='close-btn'><FaTimes/></button>
            <h3>Submit your Resume</h3>
            <form className="application" onSubmit={submitForm}>
                <div className="formRow">
                    <div className="inputData">
                        <input type="text" name="name" id="name" value={name} required onChange={
                            (e)=>{
                                setName(e.target.value);
                            }
                        } />
                        <div class="underline"></div>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="inputData">
                        <input type="email" name="email" id="email" value={email} required onChange={
                            (e)=>{ 
                                setEmail(e.target.value);
                            }
                        } />
                        <div class="underline"></div>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="inputData">
                        <input type="text" name="branch" id="branch" value={branch} required onChange={
                            (e)=>{
                                setBranch(e.target.value);
                            }
                        } />
                        <div class="underline"></div>                    
                        <label htmlFor="branch">Branch</label>        
                    </div>
                    <div className="inputData">
                        <input type="text" name="role" id="role" value={role} required onChange={
                            (e)=>{
                                setRole(e.target.value);
                            }
                        } />
                        <div class="underline"></div>
                        <label htmlFor="role">Role</label>
                    </div>
                </div>
                <div className="formRow rowResume">
                    <label htmlFor="resume">Resume: </label>
                    <input className="resume" type="file" name="resume" id="resume" ref={fileInput} required />
                </div>
                <div className="formRow submit-btn">
                    <div className="inputData">
                        <div class="inner"></div>
                        <button type='submit'>Submit</button>        
                    </div>
                </div>
            </form>
        </div>
    </div>
  ) : "";
}

export default Modal;