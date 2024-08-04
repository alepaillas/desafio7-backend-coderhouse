import usersRepository from "../persistences/mongo/repositories/users.repository.mjs";
import { userResponseDto } from "../dto/userResponse.dto.mjs";
import customErrors from "../errors/customErrors.mjs";
import { generateUsersMocks } from "../mocks/user.mock.mjs"; // Import the function to generate mock users
import { createHash } from "../utils/bcrypt.mjs";

const getByEmail = async (email) => {
  const userData = await usersRepository.getByEmail(email);
  if (!userData) {
    throw customErrors.notFoundError("User not found");
  }
  return userResponseDto(userData);
};

const createUser = async (user) => {
  const existingUser = await usersRepository.getByEmail(user.email);
  if (existingUser) {
    throw customErrors.badRequestError("User already exists");
  }
  return await usersRepository.create(user);
};

const createMockUsers = async (amount) => {
  const users = generateUsersMocks(amount);
  const createdUsers = [];

  for (const user of users) {
    const { email, first_name, last_name, age, password } = user;
    const existingUser = await usersRepository.getByEmail(email);
    if (existingUser) {
      throw customErrors.badRequestError("User already exists");
    } else {
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password), // Save the password hashed
      };
      await usersRepository.create(newUser);
      createdUsers.push({ ...user, password }); // Add plain text password for response
    }
  }

  return createdUsers; // Return users with plain text passwords
};

export default {
  getByEmail,
  createUser,
  createMockUsers,
};
