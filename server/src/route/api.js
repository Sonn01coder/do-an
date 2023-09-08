import express from 'express';
import villageController from '../controllers/villageController';
import productController from '../controllers/productController';
import placeController from '../controllers/placeController';
import touristController from '../controllers/touristController';

let router =  express.Router();

let initAPIRoutes = (app) => {

    //village
    router.get('/village/getAll', villageController.getAllVillages)
    router.post('/village/create', villageController.createVillage)
    router.put('/village/update', villageController.updateVillage)
    router.delete('/village/delete/:id', villageController.deleteVillage)

    //product village
    router.get('/product/getAll', productController.getAllProducts)
    router.post('/product/create', productController.createProduct)
    router.put('/product/update', productController.updateProduct)
    router.delete('/product/delete/:id', productController.deleteProduct)


    //place village
    router.get('/place/getAll', placeController.getAllPlace)
    router.post('/place/create', placeController.createPlace)
    router.put('/place/update', placeController.updatePlace)
    router.delete('/place/delete/:id', placeController.deletePlace)

    //tourist
    router.get('/tourist/getAll', touristController.getAllTourist)
    router.post('/tourist/create', touristController.createTourist)
    router.put('/tourist/update', touristController.updateTourist)
    router.delete('/tourist/delete/:id', touristController.deleteTourist)

    return app.use('/api/v1/', router) 
}

export default initAPIRoutes;