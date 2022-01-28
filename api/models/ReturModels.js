const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReturSchema = new Schema({
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
    date: {
        type: Date
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const ReturModels = mongoose.model("retur_data", ReturSchema);
module.exports = { ReturModels }