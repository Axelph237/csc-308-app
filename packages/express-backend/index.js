import express from "express";
import cors from "cors";
import us from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// GET Users by filters 
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    // By name
    if (name != undefined && job == undefined) {
        us.findUserByName(name)
            .then(async (response) => res.send(response))
            .catch((e) => res.status(500).send(e));;
    }
    // By job
    else if (job != undefined && name == undefined) {
        us.findUserByJob(job)
            .then(async (response) => res.send(response))
            .catch((e) => res.status(500).send(e));;
    }
    // By name & job
    else if (job != undefined && name != undefined) {
        us.findUserByNameAndJob(name, job)
            .then(async (response) => res.send(response))
            .catch((e) => res.status(500).send(e));;
    }
    // All
    else {
        us.getUsers()
            .then((response) => res.send(response))
            .catch((e) => res.status(500).send(e));;
    }
});

// GET Users by id 
app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    us.findUserById(id)
        .then((response) => {
            if (response === undefined) {
                throw Error("Resource not found.")
            } else {
                res.send(response);
            }
        })
        .catch((e) => res.status(500).send(e));
});

// POST new User
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    us.addUser(userToAdd)
        .then((response) => res.status(201).send(response))
        .catch((e) => res.status(500).send(e));
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const decodedId = decodeURI(id)

    us.deleteUserById(decodedId)
        .then(async (response) => {
            if (response === undefined)
                throw Error("Resource not found.");

            us.getUsers().then((response) => res.send(response));
        })
        .catch((e) => res.status(500).send(e));
});