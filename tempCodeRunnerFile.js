import http from 'http';

const port = 3000;

const users = [
    {
        name: "Aastik Rai",
        phone: "7827536087",
        email: "aastik@gmail.com"
    }
];

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Hello World");
    }

    else if (url === "/sys" && method === "GET") {

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("Page not found");
    }

    
    else if (url === "/users" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(users));
    }

  
    else {

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("Route not found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});