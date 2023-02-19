const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/database');
const route = require('./routes/loginRouter')
const item = require('./routes/doRouter')
const client = require('./database/client');
const depo = require('./model/depoModel')
const delv = require('./model/deliveryOrderModel')


dotenv.config()
const app = express();

const connection = async (req, res) => {
    try {
        await db.authenticate()
        await db.sync()
        console.log('Database Connected')
    } catch (err) {
        next(err)
    }
}
connection()


app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());


app.use('/api/account', route)
app.use('/api/item', item)

app.listen(5000, () => {
    console.log('Server is running')
})
