import { sendMail } from "../utils/sendMail.mjs";
import customErrors from "../errors/customErrors.mjs";

const sendWelcomeEmail = async (email, name) => {
  const template = `
    <div>
      <h1>Bienvenid@ ${name} a nuestra App</h1>
      <img src="cid:gatito" />
    </div>
  `;

  try {
    await sendMail(
      email,
      "Welcome to Our App",
      "This is a test message",
      template,
    );
  } catch (error) {
    // Re-throw with more context if necessary
    throw customErrors.createError(
      `Failed to send welcome email: ${error.message}`,
      500,
    );
  }
};

export default {
  sendWelcomeEmail,
};
