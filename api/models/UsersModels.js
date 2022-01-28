const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RoleModels } = require('./RoleModels');

const UserRole = [
    {
        role_name: 'admin'
    },
    {
        role_name: 'spg'
    },
    {
        role_name: 'md'
    },
]




var UsersSchema = new Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    foto: {
        type: String
    },
    status: {
        type: Boolean
    },
    konter: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }





}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const UserModels = mongoose.model("user_model", UsersSchema);



RoleModels.find({})
    .then(role_user => {
        if (!role_user || role_user === undefined || role_user.length <= 0) {
            console.log('Generate Role')
            UserRole.map(val => {
                let GenRole = new RoleModels({
                    role_name: val.role_name,
                })
                GenRole.save()
            });
        } else {
            return;
        }

    })



module.exports = { UserModels }