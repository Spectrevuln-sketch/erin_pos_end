import React, { useMemo, useState, useEffect } from 'react'
import { InputGroup, Tables } from '../../Components'
import { useNavigate } from 'react-router-dom'
import { ApiUser } from '../../../Utils/axiosInstance'
import { ModalReact } from '../../Components'
import Swal from 'sweetalert2'
import moment from 'moment';
import Barcode from 'react-barcode';
import { useMediaQuery } from "react-responsive";
import { deviceSize } from '../../../Utils/responseive';
import { Modal } from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
const Kantor = () => {
    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });


    const [dataBarang, setDataBarang] = useState([]);
    const [AllKonter, setAllKonter] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState("");
    const [kode_artikel, setKode_artikel] = useState("")
    const [nama, setNama] = useState("")
    const [hpp, setHpp] = useState("")
    const [model, setModel] = useState("")
    const [size, setSize] = useState("")
    const [harga_normal, setHarga_normal] = useState("")
    const [disc, setDisc] = useState("")
    const [tanggal_produksi, setTanggal_produksi] = useState("")
    const [upper, setUpper] = useState("")
    const [kombinasi, setKombinasi] = useState("")
    const [lining, setLining] = useState("")
    const [jenishak, setJenishak] = useState("")
    const [supplier, setSupplier] = useState("")
    const [stok_awal, setStok_awal] = useState("")
    const [warna, setWarna] = useState("")
    const [image_stok, setImage_stok] = useState([])
    const [open, setOpenModal] = useState(false);
    const [openCreate, setOpenCreateModal] = useState(false);
    const [dataOpen, setDataOpen] = useState(undefined);

    /** React Table Props */
    useEffect(() => {
        GetBarang()
        GetDataKonter()
    }, [])


    /** Colomns Data  */
    const GetBarang = async () => {
        ApiUser.get('/get-detail-data')
            .then(res => {
                if (res.status === 200) {
                    setDataBarang(res.data)
                }
            }).catch(err => {

                console.log(err)
            })
    }


    /** End Colomns Data  */


    /** Modal Mobile */
    let ShowModalMobile = ({ data }) => {
        setOpenModal(!open)
        setDataOpen(data)
    }
    /** End Modal Mobile */

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

    const SubmitBarang = async () => {
        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('kode_artikel', kode_artikel);
            formData.append('nama', nama);
            formData.append('hpp', hpp);
            formData.append('model', model);
            formData.append('size', size);
            formData.append('harga_normal', harga_normal);
            formData.append('disc', disc);
            formData.append('tanggal_produksi', tanggal_produksi);
            formData.append('upper', upper);
            formData.append('kombinasi', kombinasi);
            formData.append('lining', lining);
            formData.append('jenishak', jenishak);
            formData.append('supplier', supplier);
            formData.append('stok_awal', stok_awal);
            formData.append('warna', warna);
            formData.append('image_stok', image_stok);
            await ApiUser.post('/create-barang', formData).then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Berhasil',
                        `${res.data.message}`,
                        'success'
                    )
                    window.location.reload();
                }
            })
        } catch (err) {
            if (err.response !== undefined) {
                Swal.fire(
                    'Gagal Menyimpan !',
                    `${err.response.data.message}`,
                    'error'
                )
            }
        }
    }




    /** Delete Functions */
    const DeleteData = async ({ data }) => {
        await ApiUser.delete(`/delete-barang/${data}`)
            .then(res => {
                Swal.fire(
                    'Delete Data!',
                    `${res.data.message}`,
                    'success'
                )
                GetBarang()
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




    // react-table
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Action",
                Header: "Action",
                Cell: ({ row }) => (
                    <>
                        <button onClick={() => DeleteData({ data: row.values._id })} className="w-20 rounded-lg btn btn-danger">
                            Delete
                        </button>
                    </>
                ),
            },

        ]);
    };




    const DataApi = useMemo(() => [...dataBarang], [dataBarang])
    const ColomnsData = useMemo(() =>
        dataBarang[0] ?
            Object.keys(dataBarang[0])
                .filter(key => key !== 'retur_article' && key !== 'pengiriman_article' && key !== 'penjualan' && key !== 'log_stok' && key !== 'penjualan_online' && key !== '__v')
                .map(key => {
                    console.log(key)
                    switch (key) {
                        case 'nama': {
                            return {
                                Header: 'Nama',
                                accessor: key
                            }
                        }
                        case 'barcode': {
                            return {
                                Header: 'Barcode',
                                accessor: 'barcode',
                                Cell: ({ row }) => (
                                    <div className="scale-50 ">

                                        <Barcode value={row.values.barcode} />
                                    </div>
                                )

                            }
                        }
                        case 'harga_normal': {
                            return {
                                Header: 'Harga Normal',
                                accessor: key
                            }
                        }
                        case 'tanggal_produksi': {
                            return {
                                Header: 'Tanggal Produksi',
                                accessor: (originalRow) => {
                                    return moment(originalRow.tanggal_produksi).format('DD MMM YYYY')
                                }
                            }
                        }
                        case 'kode_artikel': {
                            return {
                                Header: 'Kode Artikel',
                                accessor: (originalRow) => {
                                    return originalRow.kode_artikel
                                }
                            }
                        }
                        case 'image_stock': {
                            return {
                                Header: 'Gambar',
                                accessor: 'image_stock',
                                Cell: ({ row }) => (
                                    <>

                                        <img src={row.values.image_stock ? process.env.REACT_APP_IMG_DIR + '/' + row.values.image_stock : process.env.REACT_APP_IMG_DIR + '/' + 'default-product.jpg'} className="w-40 h-20" />
                                    </>
                                )
                            }
                        }
                        case 'created_at': {
                            return {
                                Header: 'Tanggal Dibuat',
                                accessor: (originalRow) => {
                                    return moment(originalRow.created_at).format('DD MMM YYYY')
                                }
                            }
                        }
                        case 'updated_at': {
                            return {
                                Header: 'Tanggal Diubah',
                                accessor: (originalRow) => {
                                    return moment(originalRow.updated_at).format('DD MMM YYYY')
                                }
                            }
                        }
                    }


                    return { Header: key, accessor: key }
                })
            : [],
        [dataBarang])
    /** End React Table Props */

    const DropdownData = (
        <>
            {AllKonter && (
                AllKonter.map(konters => (

                    <option value={konters._id} key={konters._id}>{konters.konter_name} ({konters.alamat_konter})</option>
                ))
            )}
        </>
    )
    if (!isMobile) {
        return (
            <>
                <div className="grid grid-flow-row auto-rows-auto">
                    <div className="grid grid-cols-2 gap-8 mb-5 text-transparent bg-clip-text bg-gradient-to-tl from-indigo-600 to-green-600">
                        <h1 className="text-6xl font-semibold uppercase">Data Kantor</h1>
                    </div>
                </div>
                <button className='flex flex-row items-center justify-center p-2 mb-4 text-sm text-white bg-indigo-400 rounded-full cursor-pointer w-44 hover:bg-blue-300 focus:bg-blue-300' onClick={(e) => setShowModal(true)}>Buat Product Baru</button>
                <Tables title="Data Kantor" data={DataApi} column={ColomnsData} tableHooks={tableHooks} DropDownTitle="Krim Ke.... " enableDropDown={false} DropdownData={DropdownData} DateInput={false} onChangeDate={(e) => setDate(e.target.value)} />
                <ModalReact
                    showModal={showModal}
                    closeModal={() => setShowModal(!showModal)}
                    subtitle="Product Baru"
                >
                    <form className='grid lg:grid-cols-2 sm:grid-cols-1' >


                        <InputGroup label="Kode Artikel" type="text" className="form-control" onChange={(e) => setKode_artikel(e.target.value)} />
                        <InputGroup label="Nama" type="text" className="form-control" onChange={(e) => setNama(e.target.value)} />
                        <InputGroup label="Hpp" type="text" className="form-control" onChange={(e) => setHpp(e.target.value)} />
                        <InputGroup label="Model" type="text" className="form-control" onChange={(e) => setModel(e.target.value)} />
                        <InputGroup label="Warna" type="text" className="form-control" onChange={(e) => setWarna(e.target.value)} />
                        <InputGroup label="Size" type="number" className="form-control" onChange={(e) => setSize(e.target.value)} />
                        <InputGroup label="Harga Normal" type="number" className="form-control" onChange={(e) => setHarga_normal(e.target.value)} />
                        <InputGroup label="Disc" type="number" className="form-control" onChange={(e) => setDisc(e.target.value)} />
                        <InputGroup label="Tanggal Produksi" type="date" className="form-control" onChange={(e) => setTanggal_produksi(e.target.value)} />
                        <InputGroup label="Upper" type="text" className="form-control" onChange={(e) => setUpper(e.target.value)} />
                        <InputGroup label="Kombinasi" type="text" className="form-control" onChange={(e) => setKombinasi(e.target.value)} />
                        <InputGroup label="Lining" type="text" className="form-control" onChange={(e) => setLining(e.target.value)} />
                        <InputGroup label="Jenis Hak" type="text" className="form-control" onChange={(e) => setJenishak(e.target.value)} />
                        <InputGroup label="Supplier" type="text" className="form-control" onChange={(e) => setSupplier(e.target.value)} />
                        <InputGroup label="Stok Awal" type="number" className="form-control" onChange={(e) => setStok_awal(e.target.value)} />
                        <input type="file" onChange={(e) => setImage_stok(e.target.files[0])} />
                    </form>
                    <div className='grid gird-col-1'>
                        <button type='submit' className='p-2 text-white bg-orange-300 rounded-full hover:bg-orange-200' onClick={SubmitBarang}>Submit</button>
                    </div>
                </ModalReact>

            </>
        )
    }

    if (isMobile) {
        return (
            <>
                <div className='flex flex-col items-center justify-center flex-1'>
                    <div className='flex flex-row items-start justify-center h-16 mt-2'>
                        <p className='text-2xl font-bold text-white'>Data Kantor</p>
                    </div>
                    <button className='p-2 mb-4 text-xl text-white bg-green-600' onClick={() => setOpenCreateModal(!openCreate)}>Buat Baru</button>
                    {dataBarang && (
                        <div className='flex flex-col justify-start flex-1 px-2 overflow-y-scroll'>

                            {dataBarang.map(data => (
                                <div className="card w-fit">

                                    <div className="card-body">
                                        <div className='grid content-center grid-cols-4'>
                                            <>
                                                <div className='flex flex-row text-center'>
                                                    <table className="mx-auto table-auto">
                                                        <thead className='border-2'>
                                                            <tr className='border-2'>
                                                                <th className='border-2'>Kode Artikel</th>
                                                                <th className='border-2'>Nama</th>
                                                                <th className='border-2'>Model</th>
                                                                <th className='border-2'>Barcode</th>
                                                                <th className='border-2'>Acton</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='border-2'>

                                                            <tr className='border-2'>
                                                                <td className='flex-wrap border-2'>{data.kode_artikel}</td>
                                                                <td className='border-2'>{data.nama}</td>
                                                                <td className='border-2'>{data.model}</td>
                                                                <td className='border-2'>
                                                                    <div className='-mx-10 -my-10 scale-50'>
                                                                        <Barcode value={data.barcode} width={1} />
                                                                    </div>
                                                                </td>
                                                                <td className='p-1 border-2'>
                                                                    <button className='p-2 my-2 text-white bg-blue-600' onClick={() => ShowModalMobile({ data: data })}>Detail</button>
                                                                    <button className='p-2 text-white bg-red-600' onClick={() => DeleteData({ data: data._id })} >Delete</button>
                                                                </td>

                                                            </tr>

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
                                                <Barcode value={dataOpen.barcode} width={1} />
                                            </div>

                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Artikel: </p>
                                                <p>{dataOpen.kode_artikel}</p>
                                            </div>
                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Warna: </p>
                                                <p>{dataOpen.warna}</p>
                                            </div>
                                            <div className='flex flex-row items-center justify-between text-lg'>
                                                <p>Harga: </p>
                                                <NumberFormat className="w-24 overflow-visible" thousandSeparator={true} prefix={'Rp. '} value={Math.floor(dataOpen.harga_normal)} />
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
                                    <InputGroup label="Kode Artikel" type="text" className="form-control" onChange={(e) => setKode_artikel(e.target.value)} />
                                    <InputGroup label="Nama" type="text" className="form-control" onChange={(e) => setNama(e.target.value)} />
                                    <InputGroup label="Hpp" type="text" className="form-control" onChange={(e) => setHpp(e.target.value)} />
                                    <InputGroup label="Model" type="text" className="form-control" onChange={(e) => setModel(e.target.value)} />
                                    <InputGroup label="Warna" type="text" className="form-control" onChange={(e) => setWarna(e.target.value)} />
                                    <InputGroup label="Size" type="number" className="form-control" onChange={(e) => setSize(e.target.value)} />
                                    <InputGroup label="Harga Normal" type="number" className="form-control" onChange={(e) => setHarga_normal(e.target.value)} />
                                    <InputGroup label="Disc" type="number" className="form-control" onChange={(e) => setDisc(e.target.value)} />
                                    <InputGroup label="Tanggal Produksi" type="date" className="form-control" onChange={(e) => setTanggal_produksi(e.target.value)} />
                                    <InputGroup label="Upper" type="text" className="form-control" onChange={(e) => setUpper(e.target.value)} />
                                    <InputGroup label="Kombinasi" type="text" className="form-control" onChange={(e) => setKombinasi(e.target.value)} />
                                    <InputGroup label="Lining" type="text" className="form-control" onChange={(e) => setLining(e.target.value)} />
                                    <InputGroup label="Jenis Hak" type="text" className="form-control" onChange={(e) => setJenishak(e.target.value)} />
                                    <InputGroup label="Supplier" type="text" className="form-control" onChange={(e) => setSupplier(e.target.value)} />
                                    <InputGroup label="Stok Awal" type="number" className="form-control" onChange={(e) => setStok_awal(e.target.value)} />
                                    <input type="file" onChange={(e) => setImage_stok(e.target.files[0])} />
                                    <button type="button" className='px-2 py-1 mt-4 text-white bg-orange-400 rounded-full hover:bg-orange-300 hover:text-gray-400' onClick={SubmitBarang}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </Modal>
            </>
        )
    }
}

export default Kantor
