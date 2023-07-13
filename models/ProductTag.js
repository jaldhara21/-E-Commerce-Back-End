const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define columns for the product_tag table
    // Column: id
    id: {
      type: DataTypes.INTEGER, // Data type is integer
      allowNull: false, // Attribute cannot be null
      primaryKey: true, // Attribute is the primary key
      autoIncrement: true, // Attribute automatically increments
    },
    // Column: tag_id
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag", // Reference the 'tag' table
        key: "id", // Reference the 'id' column in the 'tag' table
      },
    },
    // Column: product_id
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", // Reference the 'product' table
        key: "id", // Reference the 'id' column in the 'product' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
