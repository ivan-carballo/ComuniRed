import {Router} from "express";

import inboxAPIController from '../controllers/apiControllers/inboxAPIController.js'
const router  = Router();


router.post("/",inboxAPIController.create);
router.post("/find",inboxAPIController.getByProperty);
router.post("/remove/:id",inboxAPIController.remove);
router.post("/update/:id",inboxAPIController.update);


router.get("/",inboxAPIController.getAll);
router.get("/:id",inboxAPIController.getById);



export default router;