import express from 'express';

const app = express();

app.listen(4000, (req, res) => {
    console.log('app is listening')
})