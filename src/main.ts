
import bodyParser from 'body-parser';
import catRoutes from './routes/cat.routes';
import cors from 'cors';
import express from 'express';
 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/cats', catRoutes);


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to catmash-api!' });
});


// Launch the app on designated port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;

