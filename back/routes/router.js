import express from "express";
import cors from "cors"
import { Router } from "express";

const app = express();
app.use(cors())
const router  =  Router();

import { isAuthenticated } from '../middleware/authMiddleware.js'

import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import responseRouter from "./responseRouter.js";
import notificationRouter from './notificationRouter.js'
import inboxRouter from './inboxRouter.js'
import notiInboxRouter from './notiInboxRouter.js'



router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/response", responseRouter);
router.use("/notification", notificationRouter);
router.use("/inbox", inboxRouter);
router.use("/notiinbox", notiInboxRouter);






export default router;