import React from 'react';
import { useState } from "react";
// import axios from "axios";

function Modal(props) {
    const closeModal = () => {
        props.setTrigger(false);
    }

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [branch,setBranch] = useState("");
    const [role,setRole] = useState("");
    const [resume,setResume] = useState("");

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     console.log("Form Submitted");
    //     axios.post("http://localhost:3001/apply",{
    //         Name:name,
    //         Email:email,
    //         Branch:branch,
    //         Role:role,
    //         Resume:resume
    //     })
    //     closeModal();
    // }

  return (props.trigger) ? (
    <div className='popup'>
        <div onClick={closeModal} className="overlay"></div>
        <div className='popup-inner'>
            <button onClick={closeModal} className='close-btn'>close me</button>
            <h3>Submit your Resume</h3>
                    <form className="application" method='POST' action="/apply" encType='multipart/form-data'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" value={name} required onChange={
                            (e)=>{
                                setName(e.target.value);
                            }
                        } />
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} required onChange={
                            (e)=>{ 
                                setEmail(e.target.value);
                            }
                        } />
                        <label htmlFor="branch">Branch:</label>
                        <input type="text" name="branch" id="branch" value={branch} required onChange={
                            (e)=>{
                                setBranch(e.target.value);
                            }
                        } />
                        <label htmlFor="role">Role:</label>
                        <input type="text" name="role" id="role" value={role} required onChange={
                            (e)=>{
                                setRole(e.target.value);
                            }
                        } />
                        <label htmlFor="resume">Resume:</label>
                        <input type="file" name="resume" id="resume" value={resume} required onChange={
                            (e)=>{
                                setResume(e.target.value);
                            }
                        } />
                        <button type='submit'>Submit</button>
                    </form>
        </div>
    </div>
  ) : "";
}

export default Modal;