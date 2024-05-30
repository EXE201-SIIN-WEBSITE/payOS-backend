import express from 'express';
import morgan from 'morgan';
import bodyParser  from 'body-parser';

const app = express();
Promise = global.Promise;


import paymentRouter from './api/controllers/payment-controller.js';
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use('/payments', paymentRouter);

export default app;