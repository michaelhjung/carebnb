import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

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
                className='modal-button'
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
