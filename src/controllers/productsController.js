import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found.');
  }
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found.');
  }
  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    returnDocument: 'after',
  });

  if (!product) {
    throw new createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};

export const upsertProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body, {
    returnDocument: 'after',
    upsert: true,
    includeResultMetadata: true,
  });

  const isUpdated = result.lastErrorObject.updatedExisting;
  const product = result.value;

  res.status(isUpdated ? 200 : 201).json(product);
};
