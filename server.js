const http = require('http');
var fs = require('fs');
const os = require('os');
const host = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {   
    const url = req.url;

    if(url == '/sys') {
        // log system info
        let osinfo = { 
            hostname: os.hostname(), 
            platform: os.platform(), 
            architecture: os.arch(), 
            numberOfCPUS: os.cpus(), 
            networkInterfaces: os.networkInterfaces(), 
            uptime: os.uptime()
        };
        let data = JSON.stringify(osinfo, null, 2);

        fs.writeFile('osinfo.json', data, (err) => {
            if (err) throw err;
            console.log('OS info is written to a file');
        });

        res.statusCode = 201; 
        res.setHeader('Content-Type', 'text/plain');
        res.write("Your OS info has been saved successfully!");
        res.end();
    } else {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'text/html');
        if(url == '/' || url == '/index') {
            var render = './pages/index.html';
        } else if(url == '/' || url == '/about') {
            var render = './pages/about.html';
        } else {
            var render = './pages/404.html';
        }

        fs.readFile(render, null, function (err, data) {
            if(err) {
                // error occured
                res.writeHead(404);
                res.write('./pages/404.html');
            } else {
                // render the file
                res.write(data);
            }

            res.end();
        });
    }
});

server.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}`);
})