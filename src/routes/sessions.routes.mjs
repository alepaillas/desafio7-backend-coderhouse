import { Router } from "express";
import passport from "passport";
import {
  passportCall,
  authorization,
} from "../middlewares/passport.middleware.mjs";
import sessionsControllers from "../controllers/sessions.controllers.mjs";
import { generateUsersMocks } from "../mocks/user.mock.mjs";

const router = Router();

router.post(
  "/register",
  passportCall("register"),
  sessionsControllers.register,
);

router.post("/login", passportCall("login"), sessionsControllers.login);

router.get(
  "/github",
  passport.authenticate("github"),
  sessionsControllers.loginGithub,
);

router.get(
  "/githubCallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user) {
      req.session.user = req.user;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  },
);

router.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  sessionsControllers.current,
);

router.get("/logout", sessionsControllers.logout);

router.get("/usersmocks", async (req, res) => {
  const users = generateUsersMocks(5);

  return res.status(200).json({ status: "ok", users });
});

export default router;
