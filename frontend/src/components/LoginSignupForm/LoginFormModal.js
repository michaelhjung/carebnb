import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginSignupForm.css';

function LoginFormModal({ setShowMenu, closeMenu }) {
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
            >Log In</button>
            {showModal && (
                <Modal
                    onClose={onCloseHandler}
                >
                    <LoginForm
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                    />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
