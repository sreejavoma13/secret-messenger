
import express from 'express';
import messageRoutes from './routes/messageRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/', messageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Robust server running on <http://localhost>:${PORT}`);
});



