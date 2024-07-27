import {Router} from "express";

import followerAPIController from '../controllers/apiControllers/followerAPIController.js'
const router  = Router();


router.post("/",followerAPIController.create);
router.post("/find",followerAPIController.getByProperty);
router.post("/remove/:id",followerAPIController.remove);
router.post("/update/:id",followerAPIController.update);


router.get("/",followerAPIController.getAll);
router.get("/:id",followerAPIController.getById);



export default router;