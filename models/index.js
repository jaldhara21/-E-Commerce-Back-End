// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // The foreign key in the Product model referencing the Category model
});

// A Product belongs to many Tags through the ProductTag model
Product.belongsToMany(Tag, {
  through: ProductTag, // The intermediate model representing the many-to-many relationship between Product and Tag
});

// A Tag belongs to many Products through the ProductTag model
Tag.belongsToMany(Product, {
  through: ProductTag, // The intermediate model
});

// A Category has many Products
Category.hasMany(Product, {
  foreignKey: "category_id", // The foreign key in the Product model
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
