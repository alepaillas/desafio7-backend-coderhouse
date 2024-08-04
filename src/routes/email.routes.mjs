import { Router } from "express";
import emailControllers from "../controllers/email.controllers.mjs";

const router = Router();

router.post("/welcome", emailControllers.sendWelcomeEmail);

export default router;
