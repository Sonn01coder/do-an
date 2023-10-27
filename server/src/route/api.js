import express from 'express';
import villageController from '../controllers/villageController';
import productController from '../controllers/productController';
import pointofinterestController from '../controllers/pointofinterestController';
import pointofserviceController from '../controllers/pointofserviceController';
import neighboringpointController from '../controllers/neighboringpointController';
import placetourController from '../controllers/placetourController';
import tourController from '../controllers/tourController';
import usersController from '../controllers/usersController';
import historytourController from '../controllers/historytourController';

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


    //point of interest
    router.get('/poi/getAll', pointofinterestController.getAllPOI)
    router.post('/poi/create', pointofinterestController.createPOI)
    router.put('/poi/update', pointofinterestController.updatePOI)
    router.delete('/poi/delete/:id', pointofinterestController.deletePOI)

    //point of services
    router.get('/pos/getAll', pointofserviceController.getAllPOS)
    router.post('/pos/create', pointofserviceController.createPOS)
    router.put('/pos/update', pointofserviceController.updatePOS)
    router.delete('/pos/delete/:id', pointofserviceController.deletePOS)

    //neighboring point
    router.get('/nei/getAll', neighboringpointController.getAllNei)
    router.post('/nei/create', neighboringpointController.createNei)
    router.put('/nei/update', neighboringpointController.updateNei)
    router.delete('/nei/delete/:id', neighboringpointController.deleteNei)

    //place tour
    router.get('/place-tour/getAll', placetourController.getAllPlaceTour)
    router.post('/place-tour/create', placetourController.createPlaceTour)
    router.put('/place-tour/update', placetourController.updatePlaceTour)
    router.delete('/place-tour/delete/:id', placetourController.deletePlaceTour)

    //tour
    router.get('/tour/getAll', tourController.getAllTour)
    router.post('/tour/create', tourController.createTour)
    router.put('/tour/update', tourController.updateTour)
    router.delete('/tour/delete/:id', tourController.deleteTour)

    //user
    router.get('/user/getMember', usersController.getAllUsersExceptAdminAndSuperUser)
    router.get('/user/getUsers', usersController.getAllUsersExceptSuperUser)
    router.get('/user/getUser/:id', usersController.getUserById)
    router.post('/user/login', usersController.loginUser)
    router.post('/user/register', usersController.registerUser)
    router.put('/user/updateInfoUser', usersController.updateInfoUser)
    router.put('/user/updateRole', usersController.updateRoleUser)
    router.put('/user/changepassword', usersController.changePassword)
    router.delete('/user/delete/:id', usersController.deleteUser)

    //history tour
    router.get('/historytour/getAll', historytourController.getAllHistoryTour)
    router.post('/historytour/create', historytourController.createHistoryTour)
    router.put('/historytour/update', historytourController.updateHistoryTour)
    router.delete('/historytour/delete/:id', historytourController.deleteHistoryTour)

    return app.use('/api/v1/', router) 
}

export default initAPIRoutes;