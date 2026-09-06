import http from 'http';

const port = 3000;

const users = [
    {
        id: 1,
        name: "Aastik Rai",
        phone: "7827536087",
        email: "aastik@gmail.com"
    },
    {
        id: 2,
        name: "Aastik Rai",
        phone: "7827536087",
        email: "aastik@gmail.com"
    },
    {
        id: 3,
        name: "Aastik Rai",
        phone: "7827536087",
        email: "aastik@gmail.com"
    },
    {
        id: 4,
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

    // GET all users
    else if (url === "/users" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(users));
    }

    // GET user by id
    else if (url.startsWith("/users/") && method === "GET") {

        const id = url.split("/")[2];

        const user = users.find((u) => u.id == id);

        if (!user) {
            return res.end("User not found");
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(user));
    }

    // CREATE user
    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (content) => {
            body+=content;
        });

        req.on("end", () => {

            const newUser = JSON.parse(body);

            users.push(newUser);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify({
                user: newUser
            }));
        });
    }

    else if (url.startsWith("/delete/") && method === "DELETE") {

    const id = url.split("/")[2];

    const index = users.findIndex((u) => u.id == id);

    if (index == -1) {
        return res.end("Element not found");
    }

    users.splice(index, 1);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        message: "User deleted successfully",
        users: users
    }));
  }
  // UPDATE user
else if (url.startsWith("/update/") && method === "PUT") {

    const id = url.split("/")[2];

    const index = users.findIndex((u) => u.id == id);

    if (index == -1) {
        res.statusCode = 404;
        return res.end("User not found");
    }

    let body = "";

    req.on("data", (content) => {
        body += content;
    });

    req.on("end", () => {

        const updatedUser = JSON.parse(body);

        users[index] = {
            ...users[index],
            ...updatedUser,
            id: users[index].id
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            message: "User updated successfully",
            user: users[index]
        }));
    });
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