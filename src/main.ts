
import bodyParser from 'body-parser';
import catRoutes from './routes/cat.routes';
import cors from 'cors';
import express from 'express';
import { logger } from './utils/logger';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/cats', catRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Hello Katty!' });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to catmash-api!' });
});


// Launch the app on designated port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Application start at port ${port}`);
});

// Log the server errors
server.on('error', (error) => {
  console.log(error)
  logger.error(`An error occured : ${error}`);
});


export default app;

