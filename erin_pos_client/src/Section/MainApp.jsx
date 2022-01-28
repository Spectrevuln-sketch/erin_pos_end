import React, { useContext, useEffect } from 'react'
import {
    useRoutes,
    Navigate,
    useNavigate
} from 'react-router-dom'
import {
    Sidebar,
    Navbar,
    Footer,
    Header,
    NavbarBottom,
    ButtonNav
} from '../Page/Components'
// content
import {
    Dashboard,
    Kantor,
    LoginPage,
    MenuMobile,
    Pengiriman,
    Penjualan,
    RegisterPage,
    Retur,
    Stok,
    UserManagement,

} from '../Page/Contents'
import { useMediaQuery } from "react-responsive";
import { deviceSize } from '../Utils/responseive';
import AuthContext from '../context/authContext';
import { AiTwotoneHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiViewGridAdd } from 'react-icons/hi';
const MainApp = () => {
    let navigate = useNavigate()
    const { loggedIn, GetLoggin } = useContext(AuthContext);
    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });

    /** Reouter */
    const routes = [
        {
            path: '/',
            element: <Kantor />
        },
        {
            path: '/pengiriman',
            element: <Pengiriman />
        },
        {
            path: '/menu-mobile',
            element: <MenuMobile />
        },
        {
            path: '/retur',
            element: <Retur />
        },
        {
            path: '/penjualan',
            element: <Penjualan />
        },
        {
            path: '/stok',
            element: <Stok />
        },
        {
            path: '/user-management',
            element: <UserManagement />
        },
        {
            path: '*',
            element: <Navigate to="/" />
        },

    ]


    const authRoute = [
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '/',
            element: <LoginPage />
        },

        {
            path: '*',
            element: <Navigate to="/" />
        },

    ]

    const element = useRoutes(loggedIn ? routes : authRoute);




    // is Web / Desktop
    if (loggedIn) {

        if (!isMobile) {
            return (
                <>
                    {/* Already Login */}

                    <div className="wrapper ">
                        <Sidebar />
                        <div className="main-panel" id="main-panel">
                            {/* Navbar */}
                            {/* <Navbar /> */}

                            <div className="mt-4 content">
                                {element}
                            </div>
                            {/* Footer */}
                            <Footer />
                            {/* End Footer */}
                        </div>
                    </div>
                    {/* Not Loggin */}
                </>
            )
        }
    }

    {/* Not Loggin */ }
    if (!loggedIn) {
        if (!isMobile) {
            return (
                <div className='flex flex-1 wrapper bg-sky-900'>
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-row items-center justify-center my-auto'>
                            {element}
                        </div>
                    </div>
                </div>

            )
        }
    }


    if (loggedIn) {
        // is Mobile
        if (isMobile) {
            return (
                <>
                    <div className="flex flex-col flex-1 wrapper bg-neutral-700">
                        {/* Header */}
                        <div className='flex items-center gap-24 bg-red-400 h-36'>
                            <Header />
                        </div>
                        {/* Content */}
                        <div className='flex flex-1'>
                            {element}
                        </div>
                        <div className='flex h-24 bg-white'>
                            <div className='flex items-center justify-center flex-1'>
                                <ButtonNav title={'Penjualan'} icon={<AiOutlineShoppingCart />} uri={'/penjualan'} />
                            </div>
                            <div className='flex items-center justify-center flex-1'>
                                <ButtonNav title="Kantor" icon={<AiTwotoneHome />} uri={-1} />
                            </div>
                            <div className='flex items-center justify-center flex-1'>
                                <ButtonNav title="Menu" icon={<HiViewGridAdd />} uri={'/menu-mobile'} />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    if (!loggedIn) {
        // is Mobile
        if (isMobile) {
            return (
                <>
                    <div className="flex flex-col flex-1 wrapper bg-neutral-700">

                        {/* Content */}
                        <div className='flex items-center justify-center flex-1'>
                            {element}
                        </div>

                    </div>
                </>
            )
        }
    }
}

export default MainApp
