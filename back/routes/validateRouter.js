import {Router} from "express";

import { validateById } from "../controllers/apiControllers/validateAPIController.js";


const router  = Router();


router.get("/:id",validateById);



export default router;