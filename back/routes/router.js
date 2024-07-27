import express from "express";
import cors from "cors"
import { Router } from "express";

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



router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/response", responseRouter);
router.use("/notification", notificationRouter);
router.use("/inbox", inboxRouter);
router.use("/notiinbox", notiInboxRouter);
router.use("/follow", followRouter);
router.use("/follower", followerRouter);
router.use("/notifollow", notiFollowRouter);
router.use("/validate", validateRouter);
router.use("/remove", deleteAllRouter);





export default router;