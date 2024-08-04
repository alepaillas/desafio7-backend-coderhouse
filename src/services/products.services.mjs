import productsRepository from "../persistences/mongo/repositories/products.repository.mjs";
import { productResponseDto } from "../dto/productResponse.dto.mjs";
import customErrors from "../errors/customErrors.mjs";

const getAll = async (query, options) => {
  const products = await productsRepository.getAll(query, options);
  if (!products || products.length === 0)
    throw customErrors.notFoundError("No products found.");
  return products;
};

const getById = async (id) => {
  const productData = await productsRepository.getById(id);
  if (!productData)
    throw customErrors.notFoundError(`Product with id: ${id} not found.`);
  const product = productResponseDto(productData);
  return product;
};

const create = async (data) => {
  const product = await productsRepository.create(data);
  if (!product) throw customErrors.createError("Error creating product.");
  return product;
};

const update = async (id, data) => {
  const result = await productsRepository.update(id, data);

  // Check if the update was successful
  if (result.matchedCount === 0) {
    throw customErrors.notFoundError(`Product with id: ${id} not found.`);
  }

  // Optionally, check if the document was actually modified
  if (result.modifiedCount === 0) {
    throw customErrors.badRequestError(
      `Product with id: ${id} was found but not updated.`,
    );
  }

  const product = await productsRepository.getById(id);
  if (!product) {
    throw customErrors.notFoundError(
      `Product with id: ${id} not found after update.`,
    );
  }

  return product;
};

const deleteOne = async (id) => {
  const deleted = await productsRepository.deleteOne(id);
  if (!deleted.deletedCount)
    throw customErrors.notFoundError(`Product with id: ${id} not found.`);
  return { message: `Product with id: ${id} successfully deleted.` };
};

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create,
};
