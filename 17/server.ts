import express from 'express';

const app = express();
const port = 8000;
app.get('/', (req, res) => {
  res.send('Prueba transpilar TS a JS5');
});
app.listen(port, () => {  
  return console.log(`server is listening on ${port}`);
});