import express from 'express';

const PORT = 8080;

const app = express();

app.use(express.static('build'));

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
