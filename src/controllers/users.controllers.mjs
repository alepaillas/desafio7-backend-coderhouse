import userServices from "../services/users.services.mjs";

const createMockUsers = async (req, res, next) => {
  try {
    const { amount } = req.query; // Get the amount from query parameters
    const users = await userServices.createMockUsers(parseInt(amount, 10) || 5); // Default to 5 if not provided
    res.status(200).json({ status: "success", users });
  } catch (error) {
    next(error);
  }
};

export default {
  createMockUsers, // Add the new function to the exported object
};
