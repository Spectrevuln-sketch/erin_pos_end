const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var RoleSchema = new Schema({
    role_name: {
        type: String
    },



}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const RoleModels = mongoose.model("role", RoleSchema);

module.exports = { RoleModels }