import {Router} from "express";

import bookmarkAPIController from '../controllers/apiControllers/bookmarkAPIController.js'
const router  = Router();


router.post("/",bookmarkAPIController.create);
router.post("/find",bookmarkAPIController.getByProperty);
router.post("/remove/:id",bookmarkAPIController.remove);
router.post("/update/:id",bookmarkAPIController.update);


router.get("/",bookmarkAPIController.getAll);
router.get("/:id",bookmarkAPIController.getById);



export default router;