import express from 'express';
import cors from 'cors';
import path from 'path';
import carRoutes from './routes/carRoutes.js';
import appRoutes from "./routes/appRoutes.js";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/car', carRoutes);
app.use('/', appRoutes);

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});