import {Router} from "express";

import responseAPIController from "../controllers/apiControllers/responseAPIController.js";


const router  = Router();


router.post("/",responseAPIController.create);
router.post("/find",responseAPIController.getByProperty);
router.post("/remove/:id",responseAPIController.remove);
router.post("/update/:id",responseAPIController.update);



router.get("/",responseAPIController.getAll);
router.get("/:id",responseAPIController.getById);



export default router;