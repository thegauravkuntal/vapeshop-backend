const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, bulkCreateProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, createProduct);
router.post('/bulk', protect, admin, bulkCreateProducts);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
