var express = require('express');
var router = express.Router();
let UserControllers = require('../controllers/UserControllers')

/** User Login */
router.post('/login', UserControllers.LoginAuth);
/** End User Login */

/** Get Current User Login */
router.get('/current-login', UserControllers.CurrentUser);
/** End Get Current User Login */


/** User Register */
router.post('/register', UserControllers.RegisterAccount);
/** End User Register */

/** Login Checker */
router.get('/islogin', UserControllers.IsLogin);
/** End  Login Checker */

/** User Logout */
router.get('/logout', UserControllers.LogoutUser);
/** End User Logout */

/** Create Master User */
router.post('/generate-master-user', UserControllers.CreateMaster);
/** End Create Master User */

/** Get All Data User */
router.get('/get-all-data-user', UserControllers.GetAllUsers);
/** End Get All Data User */

/** Get All Data Artikel */
router.get('/get-all-data-barang', UserControllers.GetAllDataBarangRetur);
/** End Get All Data Artikel */

/** Get All Data Konter */
router.get('/get-all-konter', UserControllers.GetAllKonter);
/** End Get All Data Konter */


/** Create New Product */
router.post('/create-barang', UserControllers.CreateBarang);
/** End Create New Product */

/** Delete Product */
router.delete('/delete-barang/:id_barang', UserControllers.DeleteBarang);
/** End Delete Product */


/** Delete User */
router.post('/delete-user/:user_id', UserControllers.DeleteUser);
/** End Delete User */

/** Create New User */
router.post('/create-user', UserControllers.CreateUser)
/** End Create New User */

/** Get All Role Data */
router.get('/get-all-role', UserControllers.GetAllRoleData);
/** End Get All Role Data */




/** Create Konter */
router.post('/create-retur', UserControllers.CreateRetur);
/** End Create Konter */
/** Delete Retur Data */
router.delete('/delete-retur/:retur_id/:barcode', UserControllers.DeleteRetur);
/** End Delete Retur Data */
/** Update Retur Data */
router.put('/update-retur/:retur_id/:barcode', UserControllers.UpdateRetur)
/** End Update Retur Data */




/** Create Pengiriman */
router.post('/create-pengiriman', UserControllers.CreatePengiriman);
/** End Create Pengiriman */

/** Get Data Pengiriman */
router.get('/get-data-pengiriman', UserControllers.GetDataPengiriman);
/** End Get Data Pengiriman */

/** Delete Pengiriman */
router.delete('/delete-pengiriman/:pengiriman_id/:barcode', UserControllers.DeletePengiriman);
/** End Delete Pengiriman */

/** Create Penjualan */
router.post('/create-penjualan', UserControllers.CreatePenjualan);
/** End Create Penjualan */

/** Get All Data Penjualan */
router.get('/get-all-penjualan', UserControllers.GetAllDataPenjualan);
/** End Get All Data Penjualan */

/** Delete Retur Data  */
router.delete('/delete-penjualan/:penjualan_id/:barcode', UserControllers.DeletePenjualan);
/** End Delete Retur Data  */
/** Get All Data Stok */
router.get('/get-data-stok', UserControllers.GetDataStok);
/** End Get All Data Stok */


/** Delete Stok */
router.delete('/delete-stok/:uuid/:barcode/:qty', UserControllers.DeleteStok);
/** End Delete Stok */

/** Get All Data  */
router.get('/get-detail-data', UserControllers.GetDetailBarang);
/** End Get All Data  */



module.exports = router;
