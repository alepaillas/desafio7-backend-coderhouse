import { Router } from "express";
import emailControllers from "../controllers/email.controllers.mjs";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.mjs";

const router = Router();

router.post(
  "/welcome",
  passportCall("jwt"),
  authorization("admin"),
  emailControllers.sendWelcomeEmail,
);

export default router;
