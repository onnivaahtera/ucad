import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const fruits = [
  {name: 'Apple', color: 'Red'},
  {name: 'Banana', color: 'Yellow'},
];
const server = http.createServer((req, res) => {
  const method = req.method;
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({Message: 'api'}));
  } else if (method === 'GET' && req.url === '/fruits') {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(fruits));
  } else if (method === 'POST') {
    res.writeHead(200, {'content-type': 'application/json'});
    let body: any = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString()) as {
          name: string;
          color: string;
        };
        fruits.push(body);
        res.write(JSON.stringify(fruits));
        res.end();
      });
  } else if (method === 'DELETE' && req.url === '/fruits') {
    res.writeHead(200, {'content-type': 'application/json'});
    let body: any = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString()) as {
          name: string;
          color: string;
        };
        const fruit = fruits.findIndex((f) => f.name === body.name);
        if (fruit !== -1) {
          fruits.splice(fruit, 1);
        }
        res.write(
          JSON.stringify({Message: 'Deleted succsessfully', Data: fruits}),
        );
        res.end();
      });
  } else if (method === 'PUT' && req.url === '/fruits') {
    res.writeHead(200, {'content-type': 'application/json'});
    let body: any = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString()) as {
          name: string;
          color: string;
        };
        fruits.map((item) => {
          if (item.name === body.name) {
            item.name = body.name;
            item.color = body.color;
          }
        });
        res.write(
          JSON.stringify({Message: 'Updated succsessfully', Data: fruits}),
        );
        res.end();
      });
  } else {
    res.writeHead(404, {'content-type': 'application/json'});
    res.end(JSON.stringify({Message: 'Not found'}));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
