import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
const ModalReact = ({ showModal, subtitle, closeModal, children }) => {
    return (
        <>
            <Modal
                open={showModal}
                onClose={closeModal}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'w-fit',
                }}
            >
                <div className=' lg:h-full lg:w-full sm:w-2/5 sm:h-3/5 md:w-2/5 md:h-3/5'>
                    <div className='flex flex-row items-center justify-between mb-5'>
                        <div className='font-sans text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-orange-300'>

                            <h2>{subtitle}</h2>
                        </div>

                    </div>
                    <div className='grid grid-col-2 auto-cols-max'>
                        {children}
                    </div>
                </div >
            </Modal >
        </ >
    )
}

export default ModalReact;
