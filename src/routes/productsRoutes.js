import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  upsertProduct,
} from '../controllers/productsController.js';

const router = new Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.delete('/:productId', deleteProductById);
router.patch('/:productId', updateProduct);
router.put('/:productId', upsertProduct);

export default router;
