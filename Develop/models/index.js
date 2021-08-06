const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//ASSOCIATIONS

//Products belongs to Category
Product.belongsTo(Category);
//Categoriy has many Products
Category.hasMany(Product);

//Product belongs to many tags (through product tag)
Product.belongsToMany(Tag, {
  through: ProductTag
});
ProductTag.belongsTo(Tag);

//Tag belongs to many Products (through product tag)
Tag.belongsToMany(Product, {
  through: ProductTag
});
ProductTag.belongsTo(Product);


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
