import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json(new Date());
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port %d', process.env.PORT);
});
