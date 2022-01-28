import React, { useState, useContext } from 'react';
import { ApiUser } from '../../../Utils/axiosInstance';
import Swal from 'sweetalert2';
import '../../../assets/css/style.css';
import AuthContext from '../../../context/authContext'
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    let navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [TextPassword, setTextPassword] = useState(false);
    const { GetLoggin } = useContext(AuthContext);
    const SubmitLogin = async (e) => {
        e.preventDefault()
        await ApiUser.post('/login', {
            username,
            password
        })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Successed',
                        `${res.data.message}`,
                        'success'
                    )
                    GetLoggin()
                    navigate('/')
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    if (err.response.status === 404) {
                        Swal.fire(
                            'Gagal Login !',
                            `${err.response.data.message}`,
                            'error'
                        )
                    }
                }
            })
    }

    return (
        <div className="main">
            <div className='flex flex-col items-center justify-center mt-2'>
                {/* Header */}
                <img alt='logo-system' src='assets/img/storymadeid-logo.png' className='w-20 h-20 rounded-full' />
            </div>
            {/* <input type="checkbox" id="chk" aria-hidden="true" /> */}
            <div className="-mt-12 signup">
                <form onSubmit={SubmitLogin}>
                    <label htmlFor="chk" aria-hidden="true" className='login-label'>Logo brand</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" className='px-2 py-3 input-front focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-400' placeholder="User name" required />
                    <div className='flex flex-row items-center justify-center h-10 mx-auto bg-white rounded-lg w-52' >
                        <input onChange={(e) => setPassword(e.target.value)} type={TextPassword === true ? 'text' : 'password'} name="password" className='relative w-48 pr-2 bg-transparent focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-400' placeholder="Password" required />
                        <button onClick={() => setTextPassword(!TextPassword)} type="button" className={TextPassword === true ? 'absolute h-6 w-14 bg-indigo-600 line-through right-20 top-40 mt-2' : 'no-underline  h-6  bg-gray-400 w-14 absolute right-20 top-40 mt-2'} style={{ marginBottom: '20px' }}>Show</button>
                    </div>
                    <button type='submit' className='bg-indigo-400 btn-sign'>Sign In </button>
                </form>
            </div>
            {/* <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="text" name="username" className='p-3 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-400' placeholder="User name" required />
                    <input type="password" name="password" className='p-3 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-400' placeholder="Password" required />
                    <button type='submit' className='bg-indigo-400'>Sign up</button>
                    <button>Login</button>
                </form>
            </div> */}
        </div>
    )
};

export default LoginPage;
