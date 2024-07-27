import {Router} from "express";

import postAPIController from "../controllers/apiControllers/postAPIController.js";


const router  = Router();


router.post("/",postAPIController.create);
router.post("/find",postAPIController.getByProperty);
router.post("/remove/:id",postAPIController.remove);
router.post("/update/:id",postAPIController.update);


router.get("/",postAPIController.getAll);
router.get("/scroll",postAPIController.getAllScroll);
router.get("/:id",postAPIController.getById);



export default router;