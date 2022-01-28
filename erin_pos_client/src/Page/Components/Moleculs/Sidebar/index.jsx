import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/authContext'
import UserContext from '../../../../context/UserContext.js'
import { ApiUser } from '../../../../Utils/axiosInstance'
import Swal from 'sweetalert2'
// components
import { SidebarMenu } from '../../../Components'
const Sidebar = () => {
    let navigate = useNavigate();
    const { loggedIn, GetLoggin } = useContext(AuthContext);
    const { currentUser, GetCurrentUser } = useContext(UserContext);

    const Logout = async () => {
        console.log('Prepare Logout....')
        await ApiUser.get('/logout')
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Success Logout',
                        `${res.data.message}`,
                        'success'
                    )
                    GetLoggin()
                    navigate('/')
                }
            }).catch(err => {
                if (err.response === 404) {
                    Swal.fire(
                        'Gagal Logout',
                        `${err.response.data.message}`,
                        'error'
                    )
                }
            })
    }


    return (
        <>
            <div className="sidebar" style={{ backgroundColor: '#0a0a09' }}>

                <div className="flex flex-row logo">
                    <Link to="" className='flex items-center justify-around flex-1'>
                        <div className='flex flex-row items-center justify-center'>
                            <img alt='Logo' className='w-24 h-24' src='assets/img/cn-logo.svg' />
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <p className='font-mono text-sm font-semibold text-white'>Logo brand</p>
                        </div>
                    </Link>
                </div>
                <div className="flex justify-center flex-1 logo">
                    <div className='flex flex-col'>
                        <div className='p-1 rounded-full shadow-sm bg-gradient-to-tr from-zinc-400 via-gray-600 to-slate-100'>
                            <img src={currentUser.foto !== null || currentUser.foto ? process.env.REACT_APP_IMG_DIR + '/' + currentUser.foto : process.env.REACT_APP_IMG_DIR + '/' + 'default-product.jpg'} className='w-12 h-12 rounded-full ring-1 ring-white' />
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p style={{ fontSize: '20px', color: 'white' }}>{currentUser.name}</p>
                        <p style={{ fontSize: '12px', marginTop: '-10px', color: 'white' }}>
                            Role:  {currentUser.role}
                        </p>
                    </div>
                </div>
                {/* SideBar Menu */}
                <div className="sidebar-wrapper" id="sidebar-wrapper">
                    <ul className="nav">

                        {/* <SidebarMenu uri="/" label="Dashboard" icon="now-ui-icons design_app" /> */}
                        <SidebarMenu uri="/pengiriman" label="Pengiriman" icon="now-ui-icons shopping_delivery-fast" />
                        <SidebarMenu uri="/retur" label="Retur" icon="now-ui-icons loader_refresh" />
                        <SidebarMenu uri="/penjualan" label="Penjualan" icon="now-ui-icons business_money-coins" />
                        <SidebarMenu uri="/stok" label="Data Stok" icon="now-ui-icons business_chart-bar-32" />
                        <SidebarMenu uri="/user-management" label="User Management" icon="now-ui-icons users_circle-08" />
                        <SidebarMenu uri="/" label="Data Kantor" icon="now-ui-icons shopping_shop" />
                        <li>
                            <button onClick={Logout} className="flex flex-row items-center justify-start w-56 p-2 mt-4 ml-3 text-white bg-red-600 rounded-full">
                                <i className="now-ui-icons sport_user-run" />
                                <p className="-pl-5">Logout</p>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* End SideBar Menu */}
            </div>
        </>
    )
}

export default Sidebar
