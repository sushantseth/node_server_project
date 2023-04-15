//these are top level code which is executed only once when the server starts.
//in case we need to read the file once, the readFileSync can be executed at the top level of the code
const fs= require("fs")
const http = require('http')
const url = require('url')
const replacetemplate = require('./modules/replaceTemplate')
//dirname refers to the directory where the server is getting started from. which is index.js which is inside personal directory
const dataObj = fs.readFileSync(`${__dirname}/data.json`,'utf-8')
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8')
const overviewCard = fs.readFileSync(`${__dirname}/templates/overviewCard.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8')


////////////////////////////////////////////////////////////////reading and writing file blocking and non-blocking way
//blocking sync way
// const textIn = fs.readFileSync("./txt/input.txt",'utf-8')
// console.log(textIn)
// const textOut = `addition to the already existing file : ${textIn} and date is ${new Date()}`
// fs.writeFileSync('./txt/output.txt',textOut)
// console.log("written")
// console.log("before")


// //non-blocking async way
// fs.readFile('./txt/start.txt','utf-8', (err,data1)=> {
//     if(err) return console.log("Error") 
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         fs.writeFile('./txt/asyncOutput',data2,(err)=>{
//             console.log('asyncOutput created and data added')
//         })
//     })
// })
// console.log("after")

////////////////////////////////////////////////////creating server


const server = http.createServer((req,res)=>{
    const data  = JSON.parse(dataObj)
  
    //url.parse provides us with the url object with all its properties
    const {query, pathname} = url.parse(req.url, true)
    //overview path
    if(pathname === "/overview" || pathname === "/"){
       const dynamicCard =  data.map((d)=>{
        return replacetemplate(overviewCard,d)
       })
       let cardGroup = dynamicCard.join("")
       let output = overview.replace(/{TEMPLATECARD}/g,cardGroup)
        res.end(output)
    }

    //product path
    else if(pathname === "/product"){``
       let filteredData =  data.filter((d)=>{
            return d.id == query.q
        })
       let output =  replacetemplate(tempProduct,filteredData[0])
        res.end(output)
    }
    //api path
    else if (pathname === "/api"){
        res.end(dataObj)

    //error handling
    }else{
        res.writeHead(404,{
            'content-type':"text/html",
            'authentication':"1234"
        })
        res.end("<h1>error route</h1>")
    }
})

server.listen('3000','127.0.0.1',()=>{
    console.log("server running")
})
