import {Router} from "express";

import notiInboxAPIController from '../controllers/apiControllers/notiInboxAPIController.js'
const router  = Router();


router.post("/",notiInboxAPIController.create);
router.post("/find",notiInboxAPIController.getByProperty);
router.post("/remove/:id",notiInboxAPIController.remove);
router.post("/update/:id",notiInboxAPIController.update);


router.get("/",notiInboxAPIController.getAll);
router.get("/:id",notiInboxAPIController.getById);



export default router;