import express from "express";
import cors from "cors"
import { Router } from "express";

const app = express();
app.use(cors())
const router  =  Router();



import userRouter from "./userRouter.js";



router.use("/user", userRouter);






export default router;