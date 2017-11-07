const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime');
const qs = require('querystring');

http.createServer((req, res) => {
    // Parses only the path name, omitting query parameters
    let pathName = url.parse(req.url).pathname;
    
    if (req.method === 'GET') {
        if (pathName !== '') {
            fs.readFile(__dirname + pathName, (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write('Page Not Found ' + JSON.stringify(err));
                    res.end();
                } else {
                    let mimeType = mime.getType(pathName);
                    res.writeHead(200, {'Content-Type': mimeType});
                    res.write(data);
                    res.end();
                }
            })
        } else {
            let mimeType = mime.getType(pathName);
            res.writeHead(200, {'Content-Type': mimeType});
            res.write('./index.html');
            res.end();
        }
    } else if (req.method === 'POST') {
        //console.log("Receiving POST Request");
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        }).on('end', () => {
            body = JSON.parse(body);
            console.log(body);

            // Decode the image from base64 to utf8 and then write it to a file
            // to make sure we got the image

            // https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js
            // let img = new Buffer(body.image, 'base64').toString('binary');

            let img = Buffer.from(body.image, 'base64');
            //console.log(img);
            
            fs.writeFile(__dirname + "/junk/test.jpg", img, (err) => {
                if (err) {
                    return console.log("Error writing to file: " + err);
                }
                console.log("File saved successfully");
            });
            
            // TODO:
            // we need to respond back to the client
            // and let them know we got the data I believe
        });
    } else {
        res.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
        return Response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>')
    }
    
}).listen(8080);



// https://stackoverflow.com/questions/15427220/how-to-handle-post-request-in-node-js
/*          HANDLING MORE THAN ~10MB OF DATA BEING SENT TO THE SERVER
-----------------------------------------------------------------------------------------
     if (request.url === "/inbound") {
      var requestBody = '';
      request.on('data', function(data) {
        requestBody += data;
        if(requestBody.length > 1e7) {
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
*/



