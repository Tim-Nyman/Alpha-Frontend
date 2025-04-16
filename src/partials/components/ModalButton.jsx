import React from 'react'

const ModalButton = ({type, target, text}) => {

    const handleClick = () => {
        const modal = document.querySelector(target);
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <button onClick={handleClick} type="button" data-modal="true" data-target={target} className={`btn btn-${type}`}>
            <span>{text}</span>
        </button>
    )
}

export default ModalButton