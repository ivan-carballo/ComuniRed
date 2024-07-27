import {Router} from "express";

import userAPIController from "../controllers/apiControllers/userAPIController.js";


const router  = Router();


router.post("/",userAPIController.create);
router.post("/find",userAPIController.getByProperty);
router.post("/remove/:id",userAPIController.remove);
router.post("/update/:id",userAPIController.update);
router.post("/login", userAPIController.login);


router.get("/",userAPIController.getAll);
router.get("/:id",userAPIController.getById);



export default router;