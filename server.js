var http = require('http')
var fs = require('fs')
var formBody = require('body/form')


var data = [
]

var server = http.createServer(function (req, res) {
 if (req.method === 'POST') {
   formBody(req, res, (err, body) => {
     body.id = data.length + 1
     data.push(body)
     res.end('ok')
   })
 } else if (/comments.json/.test(req.url) && req.method === 'GET') {
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify(data))
    return
  } else if (req.url === '/tutorial.js') {
    fs.createReadStream('./tutorial.js', 'utf-8').pipe(res)
    return
  }
  fs.createReadStream('./index.html', 'utf-8').pipe(res)
})

server.listen(3000)
console.log('server listening on port 3000')
