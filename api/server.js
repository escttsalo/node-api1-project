const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio){
        res.status(400).json({message: 'Please provide name and bio for the user'})
    } else {
        const { name, bio } = req.body

        User.insert({name, bio})
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
});

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        }) 
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    User.findById(id)
        .then(user => {
            console.log(user)
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                console.log(user)
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
});

server.delete('/api/users/:id', async (req, res) => {
   try {
    const result = await User.remove(req.params.id)
    if (!result){
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
        res.json(result)
    }
   } catch (err) {
       res.status(500).json({
           message: err.message
       })
   }
})


server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    if (!name || !bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        try {
            const updatedUser = await User.update(id, {name, bio})
            console.log(updatedUser)
            if (!updatedUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(202).json(updatedUser)
            }
        } catch (err) {
            res.status(500).json({ message: "The user information could not be modified" })
        }
    }
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
