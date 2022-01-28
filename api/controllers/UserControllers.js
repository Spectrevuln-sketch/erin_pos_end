let jwt = require('jsonwebtoken')
let jwtDecode = require('jwt-decode')
var bcrypt = require('bcryptjs');
const { KodeArtikelModels } = require('../models/KodeArtikelModels')
const { KonterModels } = require('../models/KonterModels')
const { ReturModels } = require('../models/ReturModels')
const { UserModels } = require('../models/UsersModels')
const { v4: uuidv4 } = require('uuid');
const Upload = require('../config/uploadFile');
var randomize = require('randomatic');
var multer = require('multer')
var moment = require('moment');
var fs = require('fs');
const { RoleModels } = require('../models/RoleModels');
const { PengirimanModels } = require('../models/PengirimanModels');
const { PenjualanModels } = require('../models/PenjualanModels');

/** Get Current User Login */
exports.CurrentUser = async (req, res) => {
    let token = req.cookies.erin_token;
    console.log(token)
    if (token !== undefined || token) {
        const payload = jwtDecode(token);
        res.status(200).json(payload)
    } else {
        res.status(401).send({ message: `unatuhorize` })
    }
}
/** End Get Current User Login */



/** Register Account */
exports.RegisterAccount = async (req, res) => {
    const {
        username,
        password,
        konter,
        role
    } = req.body
    if (!username) res.status(404).send({ message: `Username Harus di isi...` })
    if (!password) res.status(404).send({ message: `password harus di isi...` })
    if (!konter) res.status(404).send({ message: `konter harus di isi...` })
    if (!role) res.status(404).send({ message: `role harus di isi...` })
    if (username && password && konter && role) {
        let User = await UserModels.findOne({ username })

        if (User) res.status(401).send({ message: `username sudah tersedia` })
        if (!User) {
            let hash_password = bcrypt.hashSync(password, 15);
            new UserModels({
                username,
                password: hash_password,
                konter,
                role
            })
                .save()
                .then(data => {
                    res.status(200).send({ message: 'user berhasil dibuat!' })
                }).catch(err => {
                    console.log(err)
                    res.status(404).send({ message: 'gagal registrasi user' })
                })

        }
    }

}
/** End Register Account */

/** Register Master */
exports.CreateMaster = async (req, res) => {
    const {
        username,
        password
    } = req.body
    if (!username) return res.status(404).send({ message: `Username Harus di isi...` })
    if (!password) return res.status(404).send({ message: `password harus di isi...` })
    let UserData = await UserModels.findOne({ username });
    if (!UserData) {
        let FindRole = await RoleModels.findOne({ role_name: 'admin' });
        if (FindRole) {
            let hash_password = bcrypt.hashSync(password, 15);
            let CreateNewUser = new UserModels({
                username,
                password: hash_password,
                role: FindRole._id
            })
            await CreateNewUser.save()
                .then(data => {
                    res.status(200).send({ message: `Master Berhasil Di Buat !` })
                }).catch(err => {
                    console.log(err)
                    res.status(404).send({ message: `Gagal Membuat Master` })
                })
        } else {
            req.status(404).send({ message: `Role Tidak Di Temukan Silahkan Hubungi Developer` })
        }
    } else {
        res.status(404).send({ message: `User Telah Tersedia !` })
    }
}
/** End Register Master */

/** Get All User  */
exports.GetAllUsers = async (req, res) => {
    await UserModels.find({})
        .populate('role')
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(err).send({ message: `Tidak Ada User !` })
        })
}
/** End Get All User  */

/** Get All Role Data */
exports.GetAllRoleData = async (req, res) => {
    await RoleModels.find({})
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Role Tidak Tersedia !` })
        })
}
/** End Get All Role Data */

/** Create User */
var ImageProfile = Upload.fields([{ name: 'foto', maxCount: 1 }])
exports.CreateUser = async (req, res) => {

    ImageProfile(req, res, (err) => {
        console.log('Data File 2 : ', req.files.foto)
        if (req.fileValidationError) {
            return res.status(400).send({ message: `${req.fileValidationError}` });
        }
        if (err instanceof multer.MulterError) {
            return res.status(501).send(err.code);
        }
        if (err) {
            return res.status(502).send({ message: err });
        }

        if (req.files && !err && !req.fileValidationError) {
            console.log('file Data', req.files === null)
            const profile_pic = req.files.foto
            const {
                username,
                name,
                password,
                role_id
            } = req.body

            if (!username) return res.status(404).send({ message: `Username Harap Di isi !` })
            if (!name) return res.status(404).send({ message: `Nama Harap Di isi !` })
            if (!password) return res.status(404).send({ message: `Password Harap Di isi !` })

            let hash_password = bcrypt.hashSync(password, 15);


            let NewUser = new UserModels({
                username,
                name,
                password: hash_password,
                role: role_id,
                foto: profile_pic === undefined ? '' : profile_pic.filename
            })
            NewUser.save()
                .then(data => {
                    res.status(200).send({ message: `Berhasil Membuat User Baru` })
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).send({ message: `Gagal Menympan User` })
                })
        }
    })
}

/** End Create User */


/** Delete User Data  */
exports.DeleteUser = async (req, res) => {
    const { user_id } = req.params;
    await UserModels.findByIdAndDelete({ _id: user_id })
        .then(data => {
            res.status(200).send({ message: `User Berhasil Di Delete` })
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `User Gagal Di Delete` })
        })
}
/** End Delete User Data  */


/** User Update Data */
exports.UserUpdateData = async (req, res) => {
    const {
        current_password,
        password,
        status,
        foto,
        konter
    } = req.body
    const { current_id } = req.params

    await bcrypt.compare(current_password, UserData.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            if (password) {
                UserModels.findOneAndUpdate({ _id: current_id }, {
                    password,
                    status: status ? true : false,
                    foto: foto ? foto : '',
                    konter: konter ? konter : ''
                })
                    .then(data => {

                    }).catch(err => {
                        console.log(err)
                        res.status(404).send({ message: `Gagal Update Data !` })
                    })
            } else {
                UserModels.findByIdAndUpdate({ _id: current_id }, {
                    status: status ? true : false,
                    foto: foto ? foto : '',
                    konter: konter ? konter : ''
                }).then(data => {
                    res.status(200).send({ message: `Data Berhasil di Ubah !` })
                }).catch(err => {
                    res.status(404).send({ message: `Gagal Update Data` })
                })
            }
        } else {
            res.status(404).send({ message: `Password Salah!`, data: false })
        }
    })


}
/** End User Update Data */



/** Login Account */
exports.LoginAuth = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const UserData = await UserModels.findOne({ username }).populate('role')
    if (!username) return res.status(404).send({ message: `Username Harus di isi...` })
    if (!password) return res.status(404).send({ message: `password harus di isi...` })
    if (username && password && UserData) {

        await bcrypt.compare(password, UserData.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                let payload = {
                    username: UserData.username,
                    name: UserData.name || UserData.name !== null ? UserData.name : 'Administrator',
                    foto: UserData.foto || UserData.foto !== null ? UserData.foto : '',
                    role: UserData.role.role_name,
                }
                var PrivateKey = fs.readFileSync('private.key');
                const GenerateToken = jwt.sign(payload, PrivateKey, { algorithm: 'HS256' });
                res.status(200)
                    .cookie("erin_token", GenerateToken)
                    .send({
                        message: `Selamat Datang User ${username}`,
                        data: true
                    });
            } else {
                res.status(404).send({ message: `Password Salah!`, data: false })
            }
        })
    } else {
        res.status(404).send({ message: `Username dan password tidak di temukan !`, data: false })
    }

}




/** End  Get All Retur Data */
exports.IsLogin = async (req, res) => {
    try {
        let token = req.cookies.erin_token;
        if (token === undefined || !token) return res.json(false);
        var PrivateKey = fs.readFileSync('private.key');
        let JwtVerify = jwt.verify(token, PrivateKey);
        if (!JwtVerify) return res.status(404).send({ message: `Data Tidak Di Temukan` })
        res.json(true)
    } catch (err) {
        console.log(err)
        res.json(false)
    }

}

/** Logout User  */
exports.LogoutUser = async (req, res) => {
    console.log(req.cookies)
    const token = req.cookies.erin_token;
    if (token) {
        res.cookie("erin_token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send({ message: 'Success Logout' });
    } else {
        res.status(404).send({ message: `Token Tidak Di Temukan !` })
    }
}
/** End  Logout User  */





/** User Checker Role */
exports.RoleChacker = async (req, res) => {
    let token = req.cookies.erin_token
    let { username } = jwtDecode(token)
    const userData = await UserModels.findOne({ username })
    if (userData) {

    } else {
        res.status(401).json(false)
    }
}
/** End User Checker Role */


exports.GetAllDataBarangRetur = async (req, res) => {
    await ReturModels.find({})
        .populate('artikel_id')
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Data Tidak Di Temukan` })
        })
}

/** Get All Conter Data */
exports.GetAllKonter = async (req, res) => {
    await KonterModels.find({})
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
        })
}
/** End Get All Conter Data */




/** Create Retur Data */
exports.CreateRetur = async (req, res) => {
    const {
        date,
        konter,
        barcode,
        qty
    } = req.body
    console.log(req.body);
    if (barcode && date && konter && qty) {
        let CurrentArtikel = await KodeArtikelModels.findOne({ barcode: barcode })
        if (CurrentArtikel) {

            let CreateRetur = new ReturModels({
                artikel_id: CurrentArtikel._id,
                date,
                konter,
                qty
            }).save()

            await KodeArtikelModels.findByIdAndUpdate({ _id: CurrentArtikel._id }, {
                stok_akhir: Math.floor(parseInt(CurrentArtikel.stok_akhir) + parseInt(qty)),
                $push: {
                    retur_article: CreateRetur._id,
                    log_stok: {
                        uuid: uuidv4(),
                        action: 'retur',
                        konter: konter,
                        stok: qty,
                        date: date
                    }
                }

            }).then(data => {
                res.status(200).send({ message: 'Data Berhasil Di Retur !' })
            }).catch(err => {
                console.log(err)
                res.status(404).send({ message: 'Data Tidak Di Temukan !' })
            })
        } else {
            res.status(404).send({ message: 'Barcode Tidak Di Temukan' })
        }
    } else {
        res.status(404).send({ message: 'Semua Data Wajib Di isi Tanggal Retur, Qty, Konter' })
    }
}
/** eND  Create Retur Data */


/** Delete Retur Data */
exports.DeleteRetur = async (req, res) => {
    const { retur_id, barcode } = req.params
    const { stok_akhir } = req.body
    const Artikel = await KodeArtikelModels.findOne({ barcode: barcode })
    await KodeArtikelModels.findOneAndUpdate({ _id: Artikel._id }, {
        $pull: {
            retur_article: {
                uuid: retur_id
            }
        }
    }).then(data => {
        res.status(200).send({ message: `Retur Berhasil Di Hapus` })
    }).catch(err => {
        console.log(err)
        res.status(404).send({ message: `Data Gagal Di hapus !` })
    })
}
/** End Delete Retur Data */

/** Update Retur Data */
exports.UpdateRetur = async (req, res) => {
    const { retur_id, barcode } = req.params
    const {
        qty
    } = req.body
    const Artikel = await KodeArtikelModels.findOne({ barcode: barcode })
    await KodeArtikelModels.findOneAndUpdate({ _id: Artikel._id }, {
        $set: {
            retur_article: {
                uuid: retur_id
            }
        }
    }).then(data => {
        res.status(200).send({ message: `Retur Berhasil Di Hapus` })
    }).catch(err => {
        console.log(err)
        res.status(404).send({ message: `Data Gagal Di hapus !` })
    })
}
/** End Update Retur Data */

/** Get Data Pengiriman */
exports.GetDataPengiriman = async (req, res) => {
    await PengirimanModels.find({})
        .populate('artikel_id')
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Data Tidak Di Temukan !` })
        })
}
/** End Get Data Pengiriman */



/** Create Pengiriman */
exports.CreatePengiriman = async (req, res) => {
    const {
        date,
        konter,
        barcode,
        qty
    } = req.body
    if (barcode && date && konter && qty) {
        let CurrentArtikel = await KodeArtikelModels.findOne({ barcode: barcode })
        if (CurrentArtikel) {
            let CreatePengiriman = new PengirimanModels({
                artikel_id: CurrentArtikel._id,
                date,
                konter,
                qty,
            }).save()
            if (CreatePengiriman) {
                await KodeArtikelModels.findByIdAndUpdate({ _id: CurrentArtikel._id }, {
                    stok_akhir: Math.floor(CurrentArtikel.stok_akhir - qty),
                    $push: {
                        pengiriman_article: CreatePengiriman._id,
                        log_stok: {
                            uuid: uuidv4(),
                            action: 'pengiriman',
                            konter: konter,
                            stok: qty,
                            date: date
                        }
                    }
                })
                    .then(data => {
                        res.status(200).send({ message: 'Data Berhasil Di Pengiriman !' })
                    }).catch(err => {
                        console.log(err)
                        res.status(404).send({ message: 'Data Tidak Di Temukan !' })
                    })
            }

        } else {
            res.status(404).send({ message: 'Barcode Tidak Di Temukan' })
        }

    } else {
        res.status(404).send({ message: 'Semua Data Wajib Di isi Tanggal Retur, Qty, Konter' })
    }
}
/** End Create Pengiriman */

/** Delete Pengiriman */
/** Delete Retur Data */
exports.DeletePengiriman = async (req, res) => {
    const { pengiriman_id, barcode } = req.params
    const { stok_akhir } = req.body
    console.log(pengiriman_id)
    const Artikel = await KodeArtikelModels.findOne({ barcode: barcode })
    let cal_stok = Math.floor(parseInt(stok_akhir) + parseInt(Artikel.stok_akhir));
    await KodeArtikelModels.findOneAndUpdate({ _id: Artikel._id }, {
        stok_akhir: cal_stok,
        $pull: {
            pengiriman_article: {
                uuid: pengiriman_id
            }
        }
    }).then(data => {
        res.status(200).send({ message: `Retur Berhasil Di Hapus` })
    }).catch(err => {
        console.log(err)
        res.status(404).send({ message: `Data Gagal Di hapus !` })
    })
}
/** End Delete Retur Data */
/** End Delete Pengiriman */


/** Create Data Penjualan */

exports.CreatePenjualan = async (req, res) => {
    const {
        date,
        disc,
        konter,
        barcode,
        qty
    } = req.body

    if (!date) return res.status(404).send({ message: `Tanggal Wajib Di Input ` })
    if (!disc) return res.status(404).send({ message: `Discount Wajib Di Input ` })
    if (!konter) return res.status(404).send({ message: `Konter Wajib Di Input ` })
    if (!barcode) return res.status(404).send({ message: `barcode Wajib Di Input ` })
    if (!qty) return res.status(404).send({ message: `Qty Wajib Di Input ` })

    let CurrentArtikel = await KodeArtikelModels.findOne({ barcode: barcode })
    if (!CurrentArtikel) return res.status(404).send({ message: 'Kode Artikel Tidak Di Temukan' })

    console.log(req.body)
    let NewPenjualan = new PenjualanModels({
        discount: parseInt(disc),
        artikel_id: CurrentArtikel._id,
        date,
        konter,
        qty
    })
    await NewPenjualan.save()
    console.log(NewPenjualan)
    if (NewPenjualan) {
        await KodeArtikelModels.findByIdAndUpdate({ _id: CurrentArtikel._id }, {
            stok_akhir: Math.floor(CurrentArtikel.stok_akhir - qty),
            $push: {
                penjualan: NewPenjualan._id,
                log_stok: {
                    uuid: uuidv4(),
                    action: 'penjualan',
                    konter: konter,
                    stok: qty,
                    date: date
                }
            }
        })
            .then(data => {
                res.status(200).send({ message: 'Data Berhasil Di Pengiriman !' })
            }).catch(err => {
                console.log(err)
                res.status(404).send({ message: 'Data Tidak Di Temukan !' })
            })
    } else {
        res.status(404).send({ message: `Gagal Insert Data` })
    }

}

/** End Create Data Penjualan */

/** Delete Data Penjualan */
exports.DeletePenjualan = async (req, res) => {
    const { penjualan_id, barcode } = req.params
    const Artikel = await KodeArtikelModels.findOne({ barcode: barcode }).populate('penjualan');
    await PenjualanModels.findByIdAndDelete({ _id: penjualan_id })
    if (PengirimanModels) {

        await KodeArtikelModels.findOneAndUpdate({ _id: Artikel._id }, {
            $pull: {
                penjualan: {
                    uuid: penjualan_id
                }
            }
        }).then(data => {
            res.status(200).send({ message: `Penjualan Berhasil Di Hapus` })
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Data Gagal Di hapus !` })
        })
    }
}
/** End Delete Data Penjualan */


/** Get All Data Penjualan */
exports.GetAllDataPenjualan = async (req, res) => {
    await PenjualanModels.find({})
        .populate('artikel_id')
        .then(data => {
            console.log('Call Penjualan', data)
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Data Tidak Di Temukan` })
        })
}
/** End Get All Data Penjualan */





/** Get All Data Stok */
exports.GetDataStok = async (req, res) => {
    await KodeArtikelModels.find({})
        .sort({ updated_at: 'desc' })
        .populate('log_stok')
        .then(data => {
            const result = data
                .map(selling => {

                    return Object.assign(
                        {},
                        {
                            _id: selling._id,
                            kode_artikel: selling.kode_artikel,
                            model: selling.model,
                            warna: selling.warna,
                            size: selling.size,
                            harga_normal: selling.harga_normal,
                            stok_akhir: selling.stok_akhir,
                            log_stok: selling.log_stok !== null ? selling.log_stok
                                .map(data => {
                                    return Object.assign(
                                        {},
                                        {
                                            uuid: data.uuid,
                                            barcode: selling.barcode,
                                            nama: selling.nama,
                                            disc: data.disc,
                                            stok: data.stok,
                                            konter: data.konter,
                                            date: data.date,
                                        }
                                    )
                                })
                                :
                                []
                        }
                    )
                })
            console.log(result)
            res.status(200).json(result)
        }).catch(err => {
            res.status(200).send({ message: 'Data Tidak Di Temukan!' })
            console.log(err)
        })
}
/** End Get All Data Stok */



/** Delete Stok */
exports.DeleteStok = async (req, res) => {
    const {
        uuid,
        barcode,
        qty
    } = req.params
    console.log(req.params)
    const Current = await KodeArtikelModels.findOne({ barcode })
    await KodeArtikelModels.findOneAndUpdate({ barcode: barcode }, {
        stok_akhir: Math.floor(parseInt(Current.stok_akhir) + parseInt(qty)),
        $pull: {
            log_stok: {
                uuid: uuid
            }
        }
    }).then(data => {
        res.status(200).send({ message: `Stok Log Berhasil Di hapus !` })
    }).catch(err => {
        console.log(err)
        res.status(404).send({ message: `Tidak Dapat Delete Stok` })
    })

}
/** End Delete Stok */






/** Create New Brang */

var ImageProduct = Upload.fields([{ name: 'image_stok', maxCount: 1 }])
exports.CreateBarang = async (req, res) => {

    ImageProduct(req, res, (err) => {
        console.log('Data File 2 : ', req.files.image_stock)
        if (req.fileValidationError) {
            return res.status(400).send({ message: `${req.fileValidationError}` });
        }
        if (err instanceof multer.MulterError) {
            return res.status(501).send(err.code);
        }
        if (err) {
            return res.status(502).send({ message: err });
        }
        if (!req.files || req.files === undefined) {

            return res.status(404).send({ message: 'Harap Uplaod Gambar Dahulu' });
        }
        if (req.files && !err && !req.fileValidationError) {
            console.log('file Data', req.files === null)
            const product_pic = req.files.image_stok
            const {
                stok_awal,
                kode_artikel,
                nama,
                hpp,
                model,
                warna,
                size,
                harga_normal,
                disc,
                tanggal_produksi,
                upper,
                kombinasi,
                lining,
                jenishak,
                supplier
            } = req.body

            let logStok = {
                uuid: uuidv4(),
                nama: nama,
                stok: stok_awal,
                disc: disc,
                date: moment()
            }

            const AddKode = new KodeArtikelModels({
                kode_artikel: kode_artikel,
                barcode: randomize('Aa0', 10),
                nama: nama,
                hpp: hpp,
                model: model,
                warna: warna,
                size: size,
                harga_normal: harga_normal,
                disc: disc,
                tanggal_produksi: tanggal_produksi,
                upper: upper,
                kombinasi: kombinasi,
                lining: lining,
                jenishak: jenishak,
                supplier: supplier,
                image_stock: product_pic === undefined ? '' : product_pic[0].filename,
                stok_awal,
                stok_akhir: stok_awal,
                log_stok: [logStok]
            })
            AddKode.save()
                .then(result => {
                    console.log(result)
                    res.status(200).send({ message: `Berhasil Menambah Product Baru Dengan Artikel ${result.kode_artikel}` })
                }).catch(err => {
                    console.log(err)
                })
        }
    })
}

/** End Create New Brang */


/** Get Detail Barang */
exports.GetDetailBarang = async (req, res) => {
    await KodeArtikelModels.find({})
        .then(data => {
            res.status(200).json(data)

        }).catch(err => {
            res.status(404).send({ message: `Data Tidak Di Temukan !` })
        })
}
/** End Get Detail Barang */


/** Delete Barang */
exports.DeleteBarang = async (req, res) => {
    const { id_barang } = req.params
    console.log(id_barang)
    await KodeArtikelModels.findByIdAndDelete({ _id: id_barang })
        .then(done => {
            res.status(200).send({ message: `Data Berhasil Di Delete` })
        }).catch(err => {
            console.log(err)
            res.status(404).send({ message: `Gagal Delete Data` })
        })
}
/** End Delete Barang */


