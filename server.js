const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3200;
const logEvents = require('./logEvent.js')
const cors = require('cors')
const errorHandle = require('./errorHandle.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const whiteList = ['http://localhost:3200', 'https://google.com']
const corsOption = {
    origin: (origin, callback) =>{
        if(whiteList.indexOf(origin) !== -1 || !origin ){
            callback(null, true)
        }else{
            callback(new Error('cors blocked for your site :('))
        }
    },
    optionsSuccessStatus: 200 
}

app.use(cors(corsOption))
// Static middleware
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.url}`, 'requestLog.txt')
    console.log(`${req.method}\t${req.url}`);
    next();
});

app.use('/clients', require('./routes/routes.js'))
app.use('/', require('./routes/root.js'))

app.use(errorHandle)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
