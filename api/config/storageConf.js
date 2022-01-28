if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Storage = {
    redis: {
        option: {
            port: 6379
        }
    },
    mongodb: {
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/pos_erin_db"
    }
}

module.exports = Storage;