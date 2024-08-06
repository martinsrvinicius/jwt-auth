const path = require('path');
const dotenv = require('dotenv');

// Determine the path to the environment file
const envFile = `.env.${process.env.NODE_ENV}` || '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });
console.log("envfile: ", envFile)
const express = require('express');
const app = express();
const api = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('./middleware/session');



const corsConfig = {
    credentials: true,
    origin: ['*']
};

app.use(cors(corsConfig));
//parse application/json
app.use(bodyParser.json({limit:1024*1024*10, tyoe: 'application/json'}));
app.use(cookieParser());
app.use(session);
app.use("/api/v1", api)

const PORT = process.env.NODE_PORT || 5000;
app.listen(PORT,'0.0.0.0', ()=>{
    console.log(PORT + ' environment');
    console.log(`Listening: http://localhost:${PORT}`);
});