const multer = require('multer');
const package = require('./packageConf');
const path = require('path');


const storage = multer.diskStorage({

    destination: async (req, file, cb) => {
        cb(null, `${package.file_upload.move_path}`)
    },
    filename: async (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = async (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|jfif)$/)) {
        req.fileValidationError = 'File Tidak Sesuai Harap Upload file jpg/png/image'
        return cb('File Tidak Sesuai Harap Upload file jpg/png/image', false)
    }
    cb(null, true)

}



var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2097152 }
})


module.exports = upload;