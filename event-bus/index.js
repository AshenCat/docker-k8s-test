const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event)
    axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log('4000: ', err.message));
    // axios.post('http://localhost:4000/events', event).catch(err => console.log('4000: ', err.message));
    axios.post('http://comments-srv:4001/events', event).catch(err => console.log('4001: ', err.message));
    axios.post('http://query-srv:4002/events', event).catch(err => console.log('4002: ', err.message));
    axios.post('http://moderation-srv:4003/events', event).catch(err => console.log('4003: ', err.message));

    res.status(201).send({status: 'OK'})
})

app.get('/events', (req,res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
});