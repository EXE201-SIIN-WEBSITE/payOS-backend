import express from 'express';
import morgan from 'morgan';
import bodyParser  from 'body-parser';

const app = express();
Promise = global.Promise;


import paymentRouter from './controllers/payment-controller.js';
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use('/payments', paymentRouter);
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({
        });
    }
    next();
});
export default app;