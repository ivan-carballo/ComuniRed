import express from "express";
import cors from "cors"
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";

const app = express();
app.use(cors())
const router  =  Router();


import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import responseRouter from "./responseRouter.js";
import notificationRouter from './notificationRouter.js'
import inboxRouter from './inboxRouter.js'
import notiInboxRouter from './notiInboxRouter.js'
import followRouter from './followRouter.js'
import followerRouter from './followerRouter.js'
import notiFollowRouter from './notiFollowRouter.js'
import validateRouter from './validateRouter.js'
import deleteAllRouter from './deleteAllRouter.js'



router.use("/user", isAuthenticated, userRouter);
router.use("/post", isAuthenticated, postRouter);
router.use("/response", isAuthenticated, responseRouter);
router.use("/notification", isAuthenticated, notificationRouter);
router.use("/inbox", isAuthenticated, inboxRouter);
router.use("/notiinbox", isAuthenticated, notiInboxRouter);
router.use("/follow", isAuthenticated, followRouter);
router.use("/follower", isAuthenticated, followerRouter);
router.use("/notifollow", isAuthenticated, notiFollowRouter);
router.use("/validate", isAuthenticated, validateRouter);
router.use("/remove", isAuthenticated, deleteAllRouter);





export default router;