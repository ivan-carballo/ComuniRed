import {Router} from "express";

import notiFollowAPIController from '../controllers/apiControllers/notiFollowAPIController.js'
const router  = Router();


router.post("/",notiFollowAPIController.create);
router.post("/find",notiFollowAPIController.getByProperty);
router.post("/remove/:id",notiFollowAPIController.remove);
router.post("/update/:id",notiFollowAPIController.update);


router.get("/",notiFollowAPIController.getAll);
router.get("/:id",notiFollowAPIController.getById);



export default router;