import {Router} from "express";

import { deleteAllUser } from "../controllers/apiControllers/deleteAllAPIController.js";


const router  = Router();


router.post("/:id", deleteAllUser);



export default router;