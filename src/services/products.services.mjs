import productsRepository from "../persistences/mongo/repositories/products.repository.mjs";
import { productResponseDto } from "../dto/productResponse.dto.mjs";
import customErrors from "../errors/customErrors.mjs";

const getAll = async (query, options) => {
  const products = await productsRepository.getAll(query, options);
  return products;
};

const getById = async (id) => {
  const productData = await productsRepository.getById(id);
  //if (!productData)
  //  throw customErrors.notFoundError(`Product id: ${id} not found.`);
  const product = productResponseDto(productData);
  return product;
};

const create = async (data) => {
  const product = await productsRepository.create(data);
  return product;
};

const update = async (id, data) => {
  await productsRepository.update(id, data);
  const product = await productsRepository.getById(id);
  return product;
};

const deleteOne = async (id) => {
  const product = await productsRepository.deleteOne(id);
  return product;
};

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create,
};
