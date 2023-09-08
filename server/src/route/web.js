import express from 'express';
import homeController  from '../controllers/homeController';

let router =  express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/admin', homeController.getAdminPage)



    return app.use('/', router) 
}

export default initWebRoutes;