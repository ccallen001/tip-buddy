import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.static('build'));

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
