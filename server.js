const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3200

app.get('^/$|/index(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/old-page(.html)?',(req, res)=>{
    res.redirect(301, 'new-page.html')
})

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'error.html'))
})

app.listen(PORT, 'localhost', ()=>{
    console.log('server running on port '+PORT);
})