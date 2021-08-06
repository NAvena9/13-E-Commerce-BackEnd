const router = require('express').Router();
const { Category, Product } = require('../../models');

//Configuration of the endopoint "/api/categories"

//FIND ALL categories
router.get('/', (req, res) => {
  Category.findAll({ 
    order: ['id'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'] 
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


//FIND ONE Category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {id: req.params.id},
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this Id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


//CREATE a NEW Category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


//UPDATE a Category by Its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    req.body,
    {where: {id: req.params.id}}
  )
  .then(dbCategoryData => {
      if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this Id'});
          return;
      }
      res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});


//DELETE a Category by its `id` value
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {category_id: req.params.id}
  })
  .then((dbProductData) => {
    Category.destroy({
      where: {id: req.params.id}
    })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this Id'});
          return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

module.exports = router;
