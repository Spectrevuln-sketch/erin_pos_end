import React, { useMemo, useState, useEffect } from 'react'
import { DropDownData, Tables } from '../../Components'
import { useNavigate } from 'react-router-dom'
import { ApiUser } from '../../../Utils/axiosInstance'
import Swal from 'sweetalert2';
import { useMediaQuery } from "react-responsive";
import { deviceSize } from '../../../Utils/responseive';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Barcode from 'react-barcode';
const Retur = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });
    const [dataRetur, setDataRetur] = useState([]);
    const [AllKonter, setAllKonter] = useState([]);
    const [date, setDate] = useState("");
    const [konter, setKonter] = useState("");
    const [barcode, setBarcode] = useState("");
    const [qty, setQty] = useState();
    const [open, setOpenModal] = useState(false);
    const [openCreate, setOpenCreateModal] = useState(false);
    const [dataOpen, setDataOpen] = useState(undefined);
    /** React Table Props */

    useEffect(() => {
        GetDataKonter()
        GetReturData()
    }, [])


    /** Colomns Data  */
    const GetReturData = async () => {
        await ApiUser.get('/get-all-data-barang')
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        setDataRetur(res.data)
                    }
                }
            }).catch(err => {

                console.log(err)
            })
    }
    /** End Colomns Data  */

    /** Get Data Konter */
    const GetDataKonter = async () => {
        await ApiUser.get('/get-all-konter')
            .then(res => {
                setAllKonter(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    /** End Get Data Konter */


    /** Insert Data Retur */
    const SubmitRetur = async (e) => {
        e.preventDefault();
        await ApiUser.post('/create-retur', {
            date,
            konter,
            barcode,
            qty
        })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Data Berhasil Di Simpan!',
                        `${res.data.message}`,
                        'success'
                    )
                    GetReturData()
                }
            }).catch(err => {

                if (err.response !== undefined) {
                    console.log(err.response)
                    if (err.response.status === 404) {

                        Swal.fire(
                            'Terjadi Kesalahan',
                            `${err.response.data.message}`,
                            'error'
                        )
                    }
                }
            })
    }
    /** End Insert Data Retur */





    /** Delete Functions */
    const DeleteData = async ({ data }) => {
        console.log(data)
        await ApiUser.delete(`/delete-retur/${data._id}/${data.artikel_id.barcode}`, {
            data: {
                stok_akhir: data.qty
            }
        })
            .then(res => {
                Swal.fire(
                    'Delete Data!',
                    `${res.data.message}`,
                    'success'
                )

                GetReturData()
            }).catch(err => {
                if (err.response !== undefined) {
                    console.log(err.response)
                    if (err.response.status === 404) {

                        Swal.fire(
                            'Terjadi Kesalahan',
                            `${err.response.data.message}`,
                            'error'
                        )
                    }
                }
            })
    }
    /** End Delete Functions */

    /** Edit Retur */
    const EditData = async ({ data }) => {
        await ApiUser.put(`/update-retur/${data._id}/${data.artikel_id.barcode}`)
            .then(res => {
                Swal.fire(
                    'Update Data!',
                    `${res.data.message}`,
                    'success'
                )
                GetReturData()
            }).catch(err => {
                if (err.response !== undefined) {
                    console.log(err.response)
                    if (err.response.status === 404) {

                        Swal.fire(
                            'Terjadi Kesalahan',
                            `${err.response.data.message}`,
                            'error'
                        )
                    }
                }
            })
    }
    /** End Edit Retur */

    const ChangeFormEdit = (e) => {

    }





    // react-table
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Barcode",
                Header: "Barcode",
                Cell: ({ row }) => (
                    <div className='-my-10 scale-50'>
                        <Barcode value={row.original.artikel_id.barcode} width={1} />
                    </div>
                )
            },
            {
                id: "Model",
                Header: "Model",
                Cell: ({ row }) => (
                    <div>
                        {row.original.artikel_id.model}
                    </div>
                )
            },
            {
                id: "Warna",
                Header: "Warna",
                Cell: ({ row }) => (
                    <div>
                        {row.original.artikel_id.warna}
                    </div>
                )
            },
            {
                id: "Size",
                Header: "Size",
                Cell: ({ row }) => (
                    <div>
                        {row.original.artikel_id.size}
                    </div>
                )
            },
            {
                id: "Harga",
                Header: "Harga",
                Cell: ({ row }) => (
                    <div>
                        {row.original.artikel_id.harga_normal}
                    </div>
                )
            },
            {
                id: "Total",
                Header: "Total",
                Cell: ({ row }) => {
                    // let totalRetur = Math.floor(row.values["Harga Normal"] + row.values.retur_article.reduce((total, value) => total = total + parseInt(value.qty), 0))
                    let totalRetur = Math.floor(parseInt(row.original.artikel_id.harga_normal) * parseInt(row.original.qty))
                    return (
                        <div className='items-center my-20'>
                            <NumberFormat className="w-24 overflow-visible" thousandSeparator={true} prefix={'Rp. '} value={totalRetur} />
                        </div>
                    )
                },
            },
            {
                id: "Action",
                Header: "Action",
                Cell: ({ row }) => {
                    return (

                        <>
                            <div className='my-20'>
                                <button className="px-2 py-1 text-white bg-red-400 focus:border-0 hover:ring-2 hover:ring-blue-200" onClick={() => DeleteData({ data: row.original })}>Delete</button>
                            </div>
                        </>
                    )
                },
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

    /** Modal Mobile */
    let ShowModalMobile = ({ data }) => {
        setOpenModal(!open)
        setDataOpen(data)
    }
    /** End Modal Mobile */




    const DataApi = useMemo(() => [...dataRetur], [dataRetur])
    const Columns = useMemo(() =>
        dataRetur[0] ?
            Object.keys(dataRetur[0])
                .filter(key => key !== '__v' && key !== 'created_at' && key !== 'updated_at')
                .map(key => {
                    console.log(key)
                    switch (key) {

                        case 'artikel_id': {
                            return {
                                Header: 'Kode Artikel',
                                accessor: (originalRow) => {
                                    return (
                                        <>
                                            <p className="my-20">{originalRow.artikel_id.kode_artikel}</p>
                                        </>
                                    )
                                }
                            }
                        }

                        case 'date': {
                            return {
                                Header: 'Tanggal Retur',
                                accessor: (originalRow) => {
                                    return (
                                        <div className="my-20">
                                            {moment(originalRow.date).format('DD MMM YYYY')}
                                        </div>
                                    )
                                }
                            }
                        }

                        case 'qty': {
                            return {
                                Header: 'QTY',
                                accessor: (originalRow) => {

                                    return (
                                        <div className="my-20">
                                            {originalRow.qty}
                                        </div>
                                    )
                                }
                            }
                        }

                        case 'konter': {
                            return {
                                Header: 'Konter',
                                accessor: (originalRow) => {

                                    return originalRow.konter
                                }
                            }
                        }
                    }
                    return { Header: key, accessor: key }
                })
            : [],
        [dataRetur])
    /** End React Table Props */


    /* ------------------------------- Web View ------------------------------ */
    if (!isMobile) {
        return (
            <>
                <div className="grid grid-flow-row auto-rows-auto">
                    <div className="grid grid-cols-4 text-transparent bg-clip-text bg-gradient-to-tl from-indigo-600 to-green-600">
                        <h1 className="text-6xl font-semibold uppercase">Retur</h1>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 mt-4 -ml-5'>
                    <div className='flex flex-col items-center font-semibold uppercase'>

                        <h4>Input Retur:</h4>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='items-center justify-center mt-2'>

                            <DropDownData title="Dari Konter..." onChange={(e) => setKonter(e.target.value)}>

                                {AllKonter && (
                                    AllKonter.map(konters => (

                                        <option value={`${konters.konter_name} (${konters.alamat_konter})`} key={konters._id}>{konters.konter_name} ({konters.alamat_konter})</option>
                                    ))
                                )}
                            </DropDownData>
                        </div>
                        <input type="text" className="bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Barcode' onChange={(e) => setBarcode(e.target.value)} />
                        <input type="number" className="bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Qty' onChange={(e) => setQty(e.target.value)} />
                        <input type="date" className="bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Date' onChange={(e) => setDate(e.target.value)} />
                        <button type="button" className='px-2 py-1 text-white bg-orange-400 rounded-full hover:bg-orange-300 hover:text-gray-400' onClick={SubmitRetur}>Submit</button>
                    </div>
                </div>
                {/* Datashow */}
                <Tables title="Data Retur" data={DataApi} column={Columns} tableHooks={tableHooks} enableDropDown={false} DateInput={false} />

                {/* End Datashow */}
                <Modal open={open} onClose={() => setOpenModal(!open)} center>
                    <table className="w-full table-auto">

                        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-50">
                            <tr>

                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Konter</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Qty</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Date</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Action</div>
                                </th>

                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {dataOpen !== undefined && (
                                <>
                                    <tr>
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{dataOpen.konter}</p>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{dataOpen.qty}</p>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{moment(dataOpen.date).format('DD MMM YYYY')}</p>
                                        </td>
                                        <td>
                                            <button className="px-2 py-1 text-white bg-red-400 focus:border-0 hover:ring-2 hover:ring-blue-200" onClick={() => DeleteData({ data: dataOpen })}>Delete</button>
                                        </td>
                                    </tr>
                                </>

                            )}
                        </tbody>
                    </table>
                </Modal>
            </>
        )
    }

    if (isMobile) {
        return (
            <>
                <div className='flex flex-col items-center justify-center flex-1'>
                    <div className='flex flex-row items-start justify-center h-16 mt-2'>
                        <p className='text-2xl font-bold text-white'>Retur</p>
                    </div>
                    <button className='p-2 mb-4 text-xl text-white bg-green-600' onClick={() => setOpenCreateModal(!openCreate)}>Buat Baru</button>
                    {dataRetur && (
                        <div className='flex flex-col justify-start flex-1 px-2 overflow-y-scroll'>
                            {dataRetur.map(data => (

                                <div className="card w-fit">

                                    <div className="card-body">
                                        <div className='grid content-center grid-cols-4'>
                                            <>
                                                <div className='flex flex-col items-center justify-center p-1 mr-2 bg-gray-300 shadow-lg'>
                                                    <p className='text-xs text-center'>{data.konter}</p>
                                                </div>
                                                <div className='flex flex-row text-center'>
                                                    <table className="mx-auto table-auto">
                                                        <thead className='border-2'>
                                                            <tr className='border-2'>
                                                                <th className='border-2'>Kode Artikel</th>
                                                                <th className='border-2'>Qty</th>
                                                                <th className='border-2'>Tanggal</th>
                                                                <th className='border-2'>Acton</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='border-2'>
                                                            {dataRetur && (
                                                                dataRetur.map(data => (

                                                                    <tr className='border-2'>
                                                                        <td className='flex-wrap border-2'>{data.artikel_id.kode_artikel}</td>
                                                                        <td className='border-2'>{data.qty}</td>
                                                                        <td className='border-2'>{moment(data.date).format('DD MMM YYYY')}</td>
                                                                        <td className='p-1 border-2'>
                                                                            <button className='p-2 my-2 text-white bg-blue-600' onClick={() => ShowModalMobile({ data: data })}>Detail</button>
                                                                            <button className='p-2 text-white bg-red-600' onClick={() => DeleteData({ data: data })} >Delete</button>
                                                                        </td>

                                                                    </tr>
                                                                ))
                                                            )}

                                                        </tbody>
                                                    </table>

                                                </div>

                                            </>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                    {/* Modal Detail */}
                    <Modal open={open} onClose={() => setOpenModal(!open)} center>
                        {dataOpen && (


                            <div className="w-full card">

                                <div className="card-body">
                                    {console.log(dataOpen)}
                                    <>
                                        <div className='flex flex-col text-center'>
                                            <p>Barcode</p>
                                            <div className='-mt-5 scale-75'>
                                                <Barcode value={dataOpen.artikel_id.barcode} width={1} />
                                            </div>

                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Artikel: </p>
                                                <p>{dataOpen.artikel_id.kode_artikel}</p>
                                            </div>
                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Warna: </p>
                                                <p>{dataOpen.artikel_id.warna}</p>
                                            </div>
                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Harga: </p>
                                                <NumberFormat className="w-24 overflow-visible" thousandSeparator={true} prefix={'Rp. '} value={Math.floor(dataOpen.artikel_id.harga_normal)} />
                                            </div>
                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>QTY: </p>
                                                <p>{dataOpen.qty}</p>
                                            </div>

                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Total: </p>
                                                <NumberFormat className="w-24 overflow-visible" thousandSeparator={true} prefix={'Rp. '} readOnly value={Math.floor(parseInt(dataOpen.artikel_id.harga_normal) * parseInt(dataOpen.qty))} />
                                            </div>

                                        </div>

                                    </>
                                </div>

                            </div>
                        )}
                    </Modal>
                    {/* End Modal Detail */}

                    {/* Modal Create */}

                    {/* End Modal Create */}
                </div>
                <Modal open={openCreate} onClose={() => setOpenCreateModal(!openCreate)} center>
                    <div className='flex flex-row text-center'>
                        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                                Buat Penjualan Baru
                            </div>
                            <div className="mt-2">
                                <form action="#" autoComplete="off" className='w-64'>
                                    <div className='flex flex-row items-center justify-center mb-4'>

                                        <DropDownData title="Kirim ke..." onChange={(e) => setKonter(e.target.value)}>

                                            {AllKonter && (
                                                AllKonter.map(konters => (

                                                    <option value={`${konters.konter_name} (${konters.alamat_konter})`} key={konters._id}>{konters.konter_name} ({konters.alamat_konter})</option>
                                                ))
                                            )}
                                        </DropDownData>
                                    </div>
                                    <input type="text" className="h-16 mb-2 bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Barcode' onChange={(e) => setBarcode(e.target.value)} />
                                    <input type="number" className="h-16 mb-2 bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Qty' onChange={(e) => setQty(e.target.value)} />
                                    <input type="date" className="h-16 mb-2 bg-white form-control focus:border-0 focus:ring-orange-300 focus:ring-2" placeholder='Date' onChange={(e) => setDate(e.target.value)} />
                                    <button type="button" className='h-16 px-2 py-1 mb-2 text-white bg-orange-400 rounded-full hover:bg-orange-300 hover:text-gray-400' onClick={SubmitRetur}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </Modal>
            </>
        )
    }
    /* ------------------------------- End Web View ------------------------------ */
}

export default Retur
