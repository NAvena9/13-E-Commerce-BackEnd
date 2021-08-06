const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//Configuration  of the endpoint "/api/tags"

// FIND ALL Tags, be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    order: ['id'],
    include: [{
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
      ],
      through: {attributes: []}
    }]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


// FIND A SINGLE Tag by `id`, be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {id: req.params.id},
    include: [{
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock'
      ],
      through: {attributes: []}
    }]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'Couldnt find a tag with this id'});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


 // CREATE A NEW TAG
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
    console.log(`The following Tag was created: "${req.body.tag_name}"!`);
    //conditional to update the ProductTag if there are product Ids in the req.body
    if (req.body.productIds) {
      console.log(`product Ids specified. Now Updating Product Tag...`);
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: tag.id
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});



// UPDATE A Tag's Name by It's `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    console.log(`Tag with ID "${req.params.id}" Updated!`);
    return ProductTag.findAll({ where: { tag_id: req.params.id } }); // finds all the associated tags from ProductTag
  })
  .then((productTags) => {
    let productTagsToRemove = [];
    let newProductTags = [];

    //If the tags are provided, this section defines the productTags to remove and the new productTags 
    if (req.body.productIds) {
      console.log(`productIds specified. Updating ProductTag...`);
      const productTagIds = productTags.map(({ product_id }) => product_id); //Iterates thorugh productTagIds to get the current Tag Ids
      newProductTags = req.body.productIds
      //Applying the filter and map methods to create a new list of new tag_ids
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            tag_id: req.params.id,
            product_id,
          };
        });
      //Creating a new constat that has the tags that need to be removed
      productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);
      }

      //Updating the Tags(creating the new ones and removing others)
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// DELETE ONE Tag by Its `id` Vlue
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {id: req.params.id}
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tags found with this Id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
