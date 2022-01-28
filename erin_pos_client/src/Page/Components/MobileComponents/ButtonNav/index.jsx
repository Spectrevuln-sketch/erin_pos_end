import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
const ButtonNav = ({ title, icon, uri }) => {
    let navigate = useNavigate()
    return (
        <div className='flex-col items-center justify-center'>
            <button onClick={() => navigate(uri)}>
                <IconContext.Provider value={{ className: 'text-dark flex flex-row items-center justify-center', size: 43 }}>
                    <span>
                        {icon}
                    </span>
                </IconContext.Provider>
            </button>
            <p className='font-bold text-center text-dark'>{title}</p>
        </div>
    );
};

export default ButtonNav;
