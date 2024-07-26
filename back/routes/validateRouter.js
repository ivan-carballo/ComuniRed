import {Router} from "express";

import { validateById, validateByProperty } from "../controllers/apiControllers/validateAPIController.js";


const router  = Router();


router.get("/:id",validateById);
router.post("/find",validateByProperty);



export default router;