const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DefinedKonter = [
    {
        konter_name: 'AEON',
        alamat_konter: 'SENTUL'
    },
    {
        konter_name: 'AEON',
        alamat_konter: 'JGC'
    },
    {
        konter_name: 'AEON',
        alamat_konter: 'BSD CITY'
    },
    {
        konter_name: 'SOGO',
        alamat_konter: 'KARAWACI'
    },
    {
        konter_name: 'SOGO',
        alamat_konter: 'ALAM SUTRA'
    },
    {
        konter_name: 'SOGO',
        alamat_konter: 'PAKUWON'
    },
    {
        konter_name: 'METRO',
        alamat_konter: 'CIBUBUR'
    },
    {
        konter_name: 'METRO',
        alamat_konter: 'GANCIT'
    },
    {
        konter_name: 'METRO',
        alamat_konter: 'PURI MALL'
    },
]

var KonterSchema = new Schema({
    konter_name: {
        type: String
    },
    alamat_konter: {
        type: String
    }


}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const KonterModels = mongoose.model("konter", KonterSchema);

KonterModels.find({})
    .then(konter => {
        if (!konter || konter === undefined || konter.length <= 0) {
            DefinedKonter.map(val => {
                let GenKonter = new KonterModels({
                    konter_name: val.konter_name,
                    alamat_konter: val.alamat_konter
                })
                GenKonter.save()
            });
        } else {
            return;
        }

    })


module.exports = { KonterModels }