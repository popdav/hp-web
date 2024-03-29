const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Mongo = require('mongodb')
const MongoClient = Mongo.MongoClient
const fs = require('fs')
const es = require('event-stream')
const Promise = require('promise')
const CSV = require('csv-string')

let exec = require('child_process').exec
const app = express()

const port = process.env.PORT || 5001

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(bodyParser.json({ limit: '100gb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100gb', extended: true }))
app.use(methodOverride())

const buffSize = 4096 //konstanta za velicinu bafera
let delimiter = '|'
// let dbOff //konstanta za mongo bazu
// MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, (err, db) => {
//   if (err) throw err
//   dbOff = db.db("fileListOffset")
// })

app.post('/input', (req, res) => {
  
  fs.readFile(__dirname + '/config_server.json', (err, data) => {
    if(err) throw err
    let jsonData = JSON.parse(data)
    //

    const filepath = jsonData.outputFilePath
    const inputfilepath = jsonData.inputFilePath
    let dataInput = req.body.input.split('\n')

    let postcode = dataInput[0] == undefined ? '' : dataInput[0]
    let Address1 = dataInput[1] == undefined ? '' : dataInput[1]
    let Address2 = dataInput[2] == undefined ? '' : dataInput[2]
    let Address3 = dataInput[3] == undefined ? '' : dataInput[3]
    let Address4 = dataInput[4] == undefined ? '' : dataInput[4]

    console.log(dataInput)
    
    const header = jsonData.header
    let dataOfHeader = jsonData.data  
    //
    let dataOfHeaderArr = dataOfHeader.split('|')
    
    dataOfHeaderArr[2] = Address1
    dataOfHeaderArr[3] = Address2
    dataOfHeaderArr[4] = Address3
    dataOfHeaderArr[5] = Address4

    dataOfHeaderArr[7] = postcode
    //
    dataOfHeader = dataOfHeaderArr.join('|')
    const text = header + '\n' + dataOfHeader
    console.log(text)
    fs.writeFile(inputfilepath, text, (err) => {
      if(err) throw err
      console.log(inputfilepath + " has been made!")
      //
      exec(jsonData.command, (err, stdout, stderr) => {
        if (err) throw err
      
    
        let insertArr = []
        let insertPromisArr = []
        let offsetInFile = 0
        let lineNum = 0
        let inc = 1
        let objProps = []
    
        let readStream = fs.createReadStream(filepath)
          .pipe(es.split())
          .pipe(es.mapSync((line) => {
            if (line !== '') {
              readStream.pause()
              if (lineNum == 0) {
                delimiter = CSV.detect(line)
                let fd = fs.openSync(filepath, 'r')
                let readBytes = 0
                let buffr = new Buffer(buffSize)
                let fieldNames = []
                readBytes = fs.readSync(fd, buffr, 0, buffr.length, 0)
                let lineF = buffr.toString()
                let firstNewLineF = lineF.indexOf("\n")
                lineF = lineF.slice(0, firstNewLineF)
                if (lineF.indexOf('\r') >= 0)
                  inc = 2
                else
                  inc = 1
    
                objProps = line.split(delimiter)
                // console.log(objProps)
              } else {
                let lineArg = line.split(delimiter)
                let obj = {}
                for(let i=0; i<objProps.length; i++){
                  obj[objProps[i]] = lineArg[i]
                }
                insertArr.push(obj)
              }
              offsetInFile += line.length + inc
              lineNum++
              readStream.resume()
            }
          }))
          .on('error', (err) => {
            console.log('Error: ' + err)
          })
          .on('end', () => {
            console.log(`stdout: ${stdout}`)
            res.send(insertArr)
          })
    
    
    
        
      })

    })
    
    //
  });

  

  

  

})




const server = app.listen(port, () => console.log(`Listening on port ${port}`))
const io = require('socket.io')(server)
