import {Router} from "express";

import followAPIController from '../controllers/apiControllers/followAPIController.js'
const router  = Router();


router.post("/",followAPIController.create);
router.post("/find",followAPIController.getByProperty);
router.post("/remove/:id",followAPIController.remove);
router.post("/update/:id",followAPIController.update);


router.get("/",followAPIController.getAll);
router.get("/:id",followAPIController.getById);



export default router;