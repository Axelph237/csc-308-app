import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// New route added in assignment
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

// GET Users by filters
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const filterUsersByJob = (userList, job) => {
    return userList.filter(
        (user) => user["job"] === job
    );
}
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
        if (job != undefined) {
            const new_result = filterUsersByJob(result.users_list, job);
            result = { users_list: new_result }
        }
      res.send(result);
    } else {
      res.send(users);
    }
});

// GET Users by id
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});

// POST new User
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

// DELETE user
const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  users["users_list"].splice(index, 1);
  if (index) {
    return "ok";
  }
  else {
    return undefined;
  }
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
    const result = deleteUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send("User deleted.");
    }
});