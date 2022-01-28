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
const Stok = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });
    const [dataStok, setDataStok] = useState([]);
    const [AllKonter, setAllKonter] = useState([]);
    const [date, setDate] = useState("");
    const [konter, setKonter] = useState("");
    const [barcode, setBarcode] = useState("");
    const [qty, setQty] = useState();
    const [open, setOpenModal] = useState(false);
    const [dataOpen, setDataOpen] = useState(undefined);
    /** React Table Props */

    useEffect(() => {
        GetDataKonter()
        GetReturData()
    }, [])


    /** Colomns Data  */
    const GetReturData = async () => {
        await ApiUser.get('/get-data-stok')
            .then(res => {
                console.log(res.data)
                setDataStok(res.data)
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
    const SubmitStok = async (e) => {
        e.preventDefault();
        await ApiUser.post('/create-stok', {
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
                    /** Reload Window */
                    navigate('/stok')
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
        await ApiUser.delete(`/delete-stok/${data.uuid}/${data.barcode}/${data.stok}`)
            .then(res => {
                if (res.status === 200) {

                    Swal.fire(
                        'Delete Data!',
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
                        <button onClick={() => ShowModalRetur({ data: row.values })} className="px-2 py-1 ml-2 font-mono font-bold text-white bg-green-600 rounded-full">
                            Detail Stok
                        </button>
                    </>
                )
            },

        ]);
    };


    /** Modal Retur */
    const ShowModalRetur = ({ data }) => {
        setOpenModal(!open)
        setDataOpen(data)
    }
    /** End Modal Retur */

    /** Count QTY */
    let CountQty = ({ data }) => (
        <>

            <div className="text-sm text-center">
                {data && (
                    data.reduce((total, value) => total = total + parseInt(value.stok), 0)


                )}

            </div>
        </>
    )
    /** End Count QTY */


    let StokAkhirComponent = ({ data }) => (
        <>
            {data && (
                <p>{data.stok_akhir}</p>
            )}
        </>
    )





    const DataApi = useMemo(() => [...dataStok], [dataStok])
    const Columns = useMemo(() =>
        dataStok[0] ?
            Object.keys(dataStok[0])
                .map(key => {
                    switch (key) {
                        case 'stok_akhir': {
                            return {
                                Header: 'Total Stok',
                                accessor: (originalRow) => {
                                    return originalRow.stok_akhir
                                },
                            }
                        }

                        case 'kode_artikel': {
                            return {
                                Header: 'Kode Artikel',
                                accessor: (originalRow) => {
                                    return originalRow.kode_artikel
                                },

                            }
                        }
                        case 'harga_normal': {
                            return {
                                Header: 'Harga Normal',
                                accessor: (originalRow) => {
                                    return <NumberFormat className="w-24 overflow-visible" thousandSeparator={true} prefix={'Rp. '} value={originalRow.harga_normal} />
                                },

                            }
                        }
                    }
                    return { Header: key, accessor: key }
                })
            : [],
        [dataStok])
    /** End React Table Props */

    const DropdownData = (
        <>
            {AllKonter && (
                AllKonter.map(konters => (

                    <option value={konters.konter_name} key={konters._id}>{konters.konter_name} ({konters.alamat_konter})</option>
                ))
            )}
        </>
    )

    /* ------------------------------- Web View ------------------------------ */
    return (
        <>
            <div className="grid grid-flow-row auto-rows-auto">
                <div className="grid grid-cols-4 text-transparent bg-clip-text bg-gradient-to-tl from-indigo-600 to-green-600">
                    <h1 className="text-6xl font-semibold uppercase">Stok</h1>
                </div>
            </div>
            {/* Datashow */}
            <Tables title="Data Stok" data={DataApi} column={Columns} tableHooks={tableHooks} DropDownTitle="Krim Ke.... " enableDropDown={false} OnChangeDropdown={(e) => setKonter(e.target.value)} DataDrop={DropdownData} DateInput={false} onChangeDate={(e) => setDate(e.target.value)} />

            {/* End Datashow */}
            <Modal open={open} onClose={() => setOpenModal(!open)} center>
                <table className="w-full table-auto">

                    <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-50">
                        <tr>

                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Konter</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Nama</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Stok</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Discount</div>
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
                            dataOpen.log_stok.map(data => (
                                <>
                                    {console.log(data)}
                                    <tr>
                                        {data.konter && (
                                            <td className="p-2 whitespace-nowrap">
                                                <p>{data.konter}</p>
                                            </td>
                                        )}
                                        {!data.konter && (
                                            <td className="p-2 whitespace-nowrap">
                                                <p>Data Kantor Awal</p>
                                            </td>
                                        )}
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{data.nama}</p>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{data.stok}</p>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <p>{data.disc}</p>
                                        </td>

                                        <td className="p-2 whitespace-nowrap">
                                            <p>{moment(data.date).format('DD MMM YYYY')}</p>
                                        </td>
                                        <td>
                                            <button className="px-2 py-1 text-white bg-red-400 focus:border-0 hover:ring-2 hover:ring-blue-200" onClick={() => DeleteData({ data: data })}>Delete</button>
                                        </td>
                                    </tr>
                                </>

                            ))
                        )}
                    </tbody>
                </table>
            </Modal>
        </>
    )
    /* ------------------------------- End Web View ------------------------------ */
}

export default Stok
