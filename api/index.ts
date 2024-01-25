import express from 'express';
import passwordRouter from "./routes/password";


const app = express();
const port = 8000;


app.use(express.json());

app.use('/', passwordRouter);

app.listen(port, () => {
    console.log(`Server listen on ${port} port!`);
});
