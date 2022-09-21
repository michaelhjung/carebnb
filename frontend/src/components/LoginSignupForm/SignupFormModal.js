import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './LoginSignupForm.css';

function SignupFormModal({ setShowMenu, closeMenu }) {
    const [showModal, setShowModal] = useState(false);

    const clickHandler = (e) => {
        document.removeEventListener('click', closeMenu);
        setShowModal(true);
    }

    const onCloseHandler = () => {
        setShowMenu(false);
        setShowModal(false);
    }

    return (
        <>
            <button
                className='button--modal button--dropdown-item button--dropdown-item-link'
                onClick={clickHandler}
            >Sign Up</button>
            {showModal && (
                <Modal
                    onClose={onCloseHandler}
                >
                    <SignupForm
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                    />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
