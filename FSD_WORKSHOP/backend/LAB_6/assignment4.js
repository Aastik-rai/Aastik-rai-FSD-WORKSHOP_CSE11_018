import express from "express";
import fs from "node:fs/promises";

// import dotenv from "dotenv";
// import cors from "cors";
// dotenv.config();

const app = express();

app.use(express.json()); // to set a middleware called express.json

const port = 3000;
const filePath = "userData.txt";


// Function to read file
async function readFile() {
    const data = await fs.readFile(filePath, "utf-8");

    const lines = data.trim().split("\n");

    const userData = lines.map((line) => {
        const [id, name, phone, email] = line.split(",");

        return {
            id: Number(id),
            name,
            phone,
            email
        };
    });

    return userData;
}


// Function to write file
async function writeFile(userData) {

    const data = userData.map((user) => {
        return `${user.id},${user.name},${user.phone},${user.email}`;
    }).join("\n");

    await fs.writeFile(filePath, data, "utf-8");
}


app.get("/", (req, res) => {

    res.status(200).json({
        message: "welcome to user",
    });

});


app.get("/user", async (req, res) => {

    try {

        const userData = await readFile();

        res.status(200).json({
            message: "data recieved",
            userData
        });

    } catch (err) {

        console.log("error", err.message);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});


app.get("/user/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const userData = await readFile();

        const user = userData.find((u) => u.id == id);

        if (!user) {

            return res.status(400).json({
                message: "user not found"
            });

        }

        res.status(200).json({
            message: "data recieved",
            user
        });

    } catch (err) {

        console.log("error", err.message);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});


app.post("/create", async (req, res) => {

    try {

        const { name, email, phone } = req.body;

        const userData = await readFile();

        const newUser = {

            id: userData.length + 1,

            name,

            phone,

            email

        };

        userData.push(newUser);

        await writeFile(userData);

        res.status(201).json({

            message: "user created successfully",

            newUser

        });

    } catch (err) {

        console.log("error", err.message);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});


// app.get("/registered",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to express server ",
//     });
// });


app.put("/edit/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const { name, email, phone } = req.body;

        const userData = await readFile();

        const userIndex = userData.findIndex(
            (u) => u.id == id
        );

        if (userIndex === -1) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        userData[userIndex] = {

            id: Number(id),

            name,

            email,

            phone

        };

        await writeFile(userData);

        return res.status(200).json({

            message: "User updated successfully",

            user: userData[userIndex]

        });

    } catch (err) {

        console.log("error:", err.message);

        return res.status(500).json({
            message: "Internal server error"
        });

    }

});


// app.post("/login",(req,res)=>{

// });


app.listen(port, () => {

    console.log(`server is running on port ${port}`);

});