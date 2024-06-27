import {Router} from "express";

import APIController from "../controllers/apiControllers/APIController.js";


const router  = Router();


router.post("/",APIController.create);
router.post("/find",APIController.getByProperty);
router.post("/remove/:id",APIController.remove);
router.post("/update/:id",APIController.update);


router.get("/",APIController.getAll);


export default router;