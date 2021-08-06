const router = require('express').Router();
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const categoryRoutes = require('./category-routes');

router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
