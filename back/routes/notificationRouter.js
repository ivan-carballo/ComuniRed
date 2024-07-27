import {Router} from "express";

import notificationAPIController from '../controllers/apiControllers/notificationAPIController.js'
const router  = Router();


router.post("/",notificationAPIController.create);
router.post("/find",notificationAPIController.getByProperty);
router.post("/remove/:id",notificationAPIController.remove);
router.post("/update/:id",notificationAPIController.update);


router.get("/",notificationAPIController.getAll);
router.get("/:id",notificationAPIController.getById);



export default router;