import express from 'express';
import userRoutes from './modules/user/userRoutes'


const createRouter = (app) => {
    const router = express.Router();
  
    userRoutes(router);

    app.use('/api', router);
    app.all('*', (req, res) => res.sendStatus(404));
  };
  
  export default createRouter;
  