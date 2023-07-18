// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // Define columns for the product table
    id: {
      type: DataTypes.INTEGER, // Data type is integer
      allowNull: false, // Attribute cannot be null
      primaryKey: true, // Attribute is the primary key
      autoIncrement: true, // Attribute automatically increments
    },
    product_name: {
      type: DataTypes.STRING, // Data type is string
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Data type is decimal
      allowNull: false,
      validate: {
        isDecimal: true, // Validate that the value is a decimal number
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Set the default value to 10
      validate: {
        isNumeric: true, // Validate that the value is a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category", // Reference the 'category' table
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
