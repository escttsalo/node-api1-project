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
                console.log(user)
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
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
