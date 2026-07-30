const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, limit = 12, skip = 0 } = req.query;
    const filter = { isHidden: false };

    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter)
      .populate('category', 'title image')
      .sort({ order: 1, createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({ products, total, hasMore: Number(skip) + products.length < total });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'title image');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.bulkCreateProducts = async (req, res, next) => {
  try {
    const products = req.body.products;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array required' });
    }
    const created = await Product.insertMany(products, { ordered: false });
    res.status(201).json({ count: created.length, products: created });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
