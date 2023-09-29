import express from 'express';
import { connectCloud, connectDB, PORT } from './config/Index.js';
import routes from './routes/Index.js';

const app = express();

connectCloud();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(5000, () => {
    console.log(`Listening on PORT ${PORT}`);
});
