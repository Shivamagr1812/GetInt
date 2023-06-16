import React from 'react';

function Modal(props) {
    const closeModal = () => {
        props.setTrigger(false);
    }

  return (props.trigger) ? (
    <div className='popup'>
        <div onClick={closeModal} className="overlay"></div>
        <div className='popup-inner'>
            <button onClick={closeModal} className='close-btn'>close me</button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Modal;