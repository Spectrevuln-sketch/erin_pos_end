const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var KodeArtikelSchema = new Schema({
    kode_artikel: {
        type: String
    },
    barcode: {
        type: String
    },
    nama: {
        type: String
    },
    hpp: {
        type: String
    },
    model: {
        type: String
    },
    warna: {
        type: String
    },
    size: {
        type: Number
    },

    harga_normal: {
        type: Number
    },
    disc: {
        type: Number
    },
    tanggal_produksi: {
        type: Date
    },
    upper: {
        type: String
    },
    kombinasi: {
        type: String
    },
    lining: {
        type: String
    },
    jenishak: {
        type: String
    },
    supplier: {
        type: String,
    },
    stok_awal: {
        type: Number
    },
    stok_akhir: {
        type: Number
    },
    image_stock: {
        type: String
    },
    retur_article: [{
        type: Schema.Types.ObjectId,
        ref: 'retur_data'
    }],
    pengiriman_article: [{
        type: Schema.Types.ObjectId,
        ref: 'pengiriman_data'
    }],
    penjualan: [{
        type: Schema.Types.ObjectId,
        ref: 'penjualan_data'
    }],
    penjualan_online: [],
    log_stok: [],


}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const KodeArtikelModels = mongoose.model("kode_artikel", KodeArtikelSchema);
module.exports = { KodeArtikelModels }