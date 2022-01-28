const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PenjualanStoreSchema = new Schema({
    artikel_id: {
        type: Schema.Types.ObjectId,
        ref: 'kode_artikel'
    },
    qty: {
        type: Number
    },
    konter: {
        type: String
    },
    discount: {
        type: Number
    },
    date: {
        type: Date
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const PenjualanModels = mongoose.model("penjualan_data", PenjualanStoreSchema);
module.exports = { PenjualanModels }