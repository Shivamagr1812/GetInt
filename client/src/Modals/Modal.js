import React from 'react';
import { useState } from "react";
import axios from "axios";

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
            <button onClick={closeModal} className='close-btn'>close me</button>
            <h3>Submit your Resume</h3>
                    <form className="application" onSubmit={submitForm}>
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
                        <input type="file" name="resume" id="resume" ref={fileInput} required />
                        <button type='submit'>Submit</button>
                    </form>
        </div>
    </div>
  ) : "";
}

export default Modal;