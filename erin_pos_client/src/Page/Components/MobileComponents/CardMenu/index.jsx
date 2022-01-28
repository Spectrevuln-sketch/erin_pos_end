import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiRecycleFill } from 'react-icons/ri'
import { GrDeliver } from 'react-icons/gr';
import { CgShutterstock } from 'react-icons/cg'
const CardMenu = () => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate('/retur')}>
                <div className="relative items-center justify-center px-20 py-4 my-2 overflow-hidden bg-white shadow-lg w-max rounded-xl md:w-60 dark:bg-gray-800">
                    <p className="mb-6 text-xl font-medium text-gray-600 dark:text-white">
                        Retur
                    </p>
                    <div className="grid items-center justify-center gap-4">
                        <div className="flex flex-col">
                            <IconContext.Provider value={{ className: 'text-dark flex flex-row items-center justify-center', size: 50 }}>
                                <span className='text-green-600'>
                                    <RiRecycleFill />
                                </span>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => navigate('/pengiriman')}>
                <div className="relative items-center justify-center py-4 my-2 overflow-hidden bg-white shadow-lg px-14 w-max rounded-xl md:w-60 dark:bg-gray-800">
                    <p className="mb-6 text-xl font-medium text-gray-600 dark:text-white">
                        Pengiriman
                    </p>
                    <div className="grid items-center justify-center gap-4">
                        <div className="flex flex-col">
                            <IconContext.Provider value={{ className: 'text-dark flex flex-row items-center justify-center', size: 50 }}>
                                <span className='text-green-600'>
                                    <GrDeliver />
                                </span>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => navigate('/stok')}>
                <div className="relative items-center justify-center px-16 py-4 my-2 overflow-hidden bg-white shadow-lg w-max rounded-xl md:w-60 dark:bg-gray-800">
                    <p className="mb-6 text-xl font-medium text-gray-600 dark:text-white">
                        Data Stok
                    </p>
                    <div className="grid items-center justify-center gap-4">
                        <div className="flex flex-col">
                            <IconContext.Provider value={{ className: 'text-dark flex flex-row items-center justify-center', size: 50 }}>
                                <span className='text-green-600'>
                                    <CgShutterstock />
                                </span>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
};

export default CardMenu;
