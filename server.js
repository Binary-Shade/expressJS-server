const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3200;
const logEvents = require('./logEvent.js')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const whiteList = ['http://localhost:3200', 'https://google.com']
const corsOption = {
    origin: (origin, callback) =>{
        if(whiteList.indexOf(origin) !== -1){
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

// Route handlers
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
