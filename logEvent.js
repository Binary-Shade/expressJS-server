const {v4: uuid} = require('uuid')
const {format} = require('date-fns')

const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const fsPromise = require('fs').promises


const logEvents = async (msg, fName) =>{
    const date = format(new Date(), 'ddMMyyyy\t HH:mm:ss')
    const logMsg = `${date}\t${uuid()}\t${msg}\n`
    
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromise.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname, 'logs', fName), logMsg)
    } catch (err) {
        console.error(err);
    }
}

process.on('uncaughtException', (err)=>{
    console.log(err);
    exit(1)
})

module.exports = logEvents

