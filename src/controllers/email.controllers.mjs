import emailServices from "../services/email.services.mjs";
import customErrors from "../errors/customErrors.mjs";

const sendWelcomeEmail = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    await emailServices.sendWelcomeEmail(email, name);
    res
      .status(200)
      .json({ status: "success", msg: "Email sent successfully." });
  } catch (error) {
    next(error);
  }
};

export default {
  sendWelcomeEmail,
};
