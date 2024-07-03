import {Router} from "express";

import responseAPIController from "../controllers/apiControllers/responseAPIController.js";


const router  = Router();


router.response("/",responseAPIController.create);
router.response("/find",responseAPIController.getByProperty);
router.response("/remove/:id",responseAPIController.remove);
router.response("/update/:id",responseAPIController.update);


router.get("/",responseAPIController.getAll);
router.get("/:id",responseAPIController.getById);



export default router;