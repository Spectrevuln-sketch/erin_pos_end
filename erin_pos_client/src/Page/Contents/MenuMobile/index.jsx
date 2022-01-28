import React from 'react';
import { CardMenu } from '../../Components';

const MenuMobile = () => {
    return (
        <div className='flex flex-col items-center justify-center flex-1'>
            <div className='flex flex-row items-start justify-center h-16 mt-2'>
                <p className='text-2xl font-bold text-white'>Menu System</p>
            </div>
            <div className='flex flex-col justify-start flex-1 overflow-y-scroll'>
                <CardMenu title={'Retur'} />
            </div>
        </div>
    );
};

export default MenuMobile;
