import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosArrowBack } from 'react-icons/io';
const Header = () => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate(-1)}>
                <IconContext.Provider value={{ className: 'text-white ml-4', size: 30 }}>
                    <div className='font-extrabold'>
                        <IoIosArrowBack />
                    </div>
                </IconContext.Provider>
            </button>
            <div className='flex flex-col items-center'>
                <img className='w-24' alt='logo-here' src='assets/img/cn-logo.svg' />
            </div>
        </>
    )
}

export default Header
