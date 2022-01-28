import React, { useMemo, useState, useEffect } from 'react'
import { Tables } from '../../Components'
import { useNavigate } from 'react-router-dom'
import { ApiUser } from '../../../Utils/axiosInstance'
import Swal from 'sweetalert2';
import { useMediaQuery } from "react-responsive";
import { deviceSize } from '../../../Utils/responseive';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
import moment from 'moment';
const UserManagement = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState([]);
    const [date, setDate] = useState("");
    const [konter, setKonter] = useState("");
    /** Forms Data */
    const [user_role, setUserRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState([]);
    /** Modal */
    const [open, setOpenModal] = useState(false);
    const [dataOpen, setDataOpen] = useState(undefined);
    /** React Table Props */

    useEffect(() => {
        GetDataUser()
        GetAllRole()
    }, [])


    /** Get all Role Data */
    const GetAllRole = async () => {
        await ApiUser.get('/get-all-role')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setRole(res.data)
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    if (err.response.status === 404) {
                        console.log(err.response.data.message)
                    }
                }
            })
    }
    /** End Get all Role Data */

    /** Colomns Data  */
    const GetDataUser = async () => {
        await ApiUser.get('/get-all-data-user')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.role) {

                    }
                    console.log(res.data)
                    setUsers(res.data)
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    console.log(err.response.data.message)
                }
            })
    }
    /** End Colomns Data  */





    /** Delete Functions */
    const DeleteUser = async ({ data }) => {
        await ApiUser.post(`/delete-user/${data._id}`)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Good job!',
                        `${res.data.message}`,
                        'success'
                    )
                    GetDataUser()
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    Swal.fire(
                        'Good job!',
                        `${err.response.data.message}`,
                        'error'
                    )
                }
            })
    }
    /** End Delete Functions */


    /** Create New User */
    let CreateNewUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('role_id', user_role);
            formData.append('foto', foto);


            await ApiUser.post('/create-user', formData)
                .then(res => {
                    if (res.status === 200) {

                        Swal.fire(
                            'Success Membuat User Baru',
                            `${res.data.message}`,
                            'success'
                        )
                        GetDataUser()
                        navigate('/user-management')
                    }
                }).catch(err => {
                    if (err.response !== undefined) {
                        if (err.response.status === 404) {
                            Swal.fire(
                                'Terjadi Kesalahan',
                                `${err.response.data.message}`,
                                'error'
                            )
                        }
                    }
                })
        } catch (err) {
            if (err.response !== undefined) {

                Swal.fire(
                    'Terjadi Kesalahan',
                    `${err.response.data.message}`,
                    'error'
                )
            }
        }
    }
    /** End Create New User */




    // react-table
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,

            {
                id: "Action",
                Header: "Action",
                Cell: ({ row }) => (
                    <>
                        {row.values["Role"] !== 'admin' && (
                            <button onClick={() => DeleteUser({ data: row.values })} className="px-2 py-1 ml-2 text-white bg-green-300 rounded-full">
                                Delete
                            </button>
                        )}
                    </>
                ),
            },



        ]);
    };

    /** Ba */

    /** Modal Retur */
    const ShowModalRetur = ({ data }) => {
        setOpenModal(!open)
        setDataOpen(data)
    }
    /** End Modal Retur */







    const DataApi = useMemo(() => [...users], [users])
    const Columns = useMemo(() =>
        users[0] ?
            Object.keys(users[0])
                .filter(key => key !== 'password' && key !== '__v')
                .map(key => {
                    console.log(key)
                    switch (key) {
                        case 'username': {
                            return {
                                Header: 'Username',
                                accessor: (originalRow) => {
                                    return originalRow.username
                                }
                            }
                        }
                        case 'foto': {
                            return {
                                Header: 'Foto',
                                accessor: (originalRow) => {
                                    return <img className='w-20 h-20 rounded-full' src={originalRow.foto ? process.env.REACT_APP_IMG_DIR + '/' + originalRow.foto : 'assets/img/default-user.jpg'} />


                                }
                            }
                        }
                        case 'created_at': {
                            return {
                                Header: 'Tanggal Registrasi',
                                accessor: (originalRow) => {
                                    return moment(originalRow.created_at).format('DD MMM YYYY')
                                }
                            }
                        }
                        case 'updated_at': {
                            return {
                                Header: 'Tanggal Modifikasi',
                                accessor: (originalRow) => {
                                    return moment(originalRow.updated_at).format('DD MMM YYYY')
                                }
                            }
                        }
                        case 'role': {
                            return {
                                Header: 'Role',
                                accessor: (originalRow) => {
                                    return originalRow.role.role_name;
                                }
                            }
                        }

                    }
                    return { Header: key, accessor: key }
                })
            : [],
        [users])
    /** End React Table Props */



    /* ------------------------------- Web View ------------------------------ */
    return (
        <>
            <div className="grid grid-flow-row auto-rows-auto">
                <div className="grid grid-cols-4">
                    <h1 className="text-3xl font-semibold capitalize">User Management</h1>
                </div>
            </div>
            {/* Datashow */}
            <div className='flex flex-row items-center mt-2'>
                <button onClick={ShowModalRetur} className="p-2 text-white bg-blue-400 rounded-lg">Create User</button>
            </div>
            <Tables title="Data Stok" data={DataApi} column={Columns} tableHooks={tableHooks} DropDownTitle="Krim Ke.... " enableDropDown={false} OnChangeDropdown={(e) => setKonter(e.target.value)} DateInput={false} onChangeDate={(e) => setDate(e.target.value)} />

            {/* End Datashow */}
            <Modal open={open} onClose={() => setOpenModal(!open)} center>
                <form className='grid col-auto gap-4'>
                    <div className='grid grid-rows-2'>
                        <label>Username</label>
                        <input type="text" placeholder='Username' className='border-2 border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='grid grid-rows-2'>
                        <label>Password</label>
                        <input type="password" placeholder='Password' className='border-2 border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='grid grid-rows-2'>
                        <label>Foto</label>
                        <input type='file' placeholder='Foto' className='border-2 border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none' onChange={(e) => setFoto(e.target.files[0])} />
                    </div>
                    <div>
                        <div className="relative inline-flex self-center">
                            <svg className="absolute top-0 bottom-0 left-0 right-0 mb-2 text-white bg-blue-700 rounded pointer-events-none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 38 22" version="1.1">
                                <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                                <g id="ZahnhelferDE—Design" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="ZahnhelferDE–Icon&Asset-Download" transform="translate(-539.000000, -199.000000)" fill="#ffffff" fillRule="nonzero">
                                        <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                                            <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <select className="h-10 px-5 font-bold text-gray-600 bg-white border-2 border-blue-700 rounded appearance-none w-72 hover:border-gray-400 focus:outline-none" onChange={(e) => setUserRole(e.target.value)}>
                                <option defaultValue={''}>Pilih Role....</option>
                                {role && (
                                    role.map(role_user => (

                                        <>
                                            <option value={role_user._id} className="uppercase">{role_user.role_name}</option>

                                        </>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-rows-2'>
                        <button className='p-2 text-white bg-blue-400' onClick={CreateNewUser}>Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    )
    /* ------------------------------- End Web View ------------------------------ */
}

export default UserManagement
