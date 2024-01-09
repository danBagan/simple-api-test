const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const users = [{
    id: 1,
    name: "Jennifer Holden",
    age: "23",
    },
    {
    id: 2,
    name: "John Doe",
    age: "31",
   },
   {
    id: 3,
    name: "Simon Edison",
    age: "45",
   }];



//CREATE USER
app.post('/create', (req, res) => {
    //create User
    if(!Object.keys(req.body).length){
        return res.status(400).json({
            message: "Request Body Cannot be Empty",
        });
    }

    const {name, age} = req.body;
    if(!name || !age){
        res.status(400).json({
            message: "Ensure you sent both name and age",
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    try{
        users.push(newUser);
        res.status(201).json({
            message: "Successfully created a new user",
        });

    }catch(error){
        res.status(500).json({
            message: "Failed to create new user",
        });
    }
});

//GET ALL USERS
app.get("/users", (req, res) => {
    try{
        res.status(200).json({
            users
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to retrieve all users",
        });
    }
});


//GET USER
app.get("/users/:userID", (req, res) => {
    const id = parseInt(req.params.userID);
    console.log(id);
    try{
        let user = users.find((user) => user.id === id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            user,
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to retrieve user",
        });
    }
});

//UPDATE USER
app.put("/users/:userID", (req, res) => {
    try{
        const id = parseInt(req.params.userID);
        let user = users.find((user) => user.id === id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }
        const userIDX = users.indexOf(user);
        users[userIDX].name = req.body.name || users[userIDX].name;
        users[userIDX].age = req.body.age || users[userIDX].age;
        res.status(200).json({
            message: "Successfully updated user",
            user,
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to retrieve user",
        });
    }
});

//DELETE USER
app.delete("/users/:userID", (req, res) => {
    try{
        const id = req.params.userID;
        let userIDX = users.findIndex((user) => user.id === id);
        if(!userID){
            res.status(404).json({
                message: "User not found",
            });
        }
        users.splice(userIDX, 1);
        res.status(200).json({
            message: "Successfully deleted user",
            users,
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to delete user",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Console Running on port ${PORT}`);
});
