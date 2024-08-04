import usersRepository from "../persistences/mongo/repositories/users.repository.mjs";
import { userResponseDto } from "../dto/userResponse.dto.mjs";
import customErrors from "../errors/customErrors.mjs";

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

export default {
  getByEmail,
  createUser,
};
