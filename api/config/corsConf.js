if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// origin: [`${process.env.ALLOW_CLIENT1}`, `${process.env.ALLOW_CLIENT2}`],

const CorsConf = {
    option: {
        origin: [`${process.env.ALLOW_CLIENT1}`, `${process.env.ALLOW_CLIENT_SERVER}`],
        credentials: true
    }
}

module.exports = CorsConf;