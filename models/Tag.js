const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {}

Tag.init(
  {
    // define columns for the tag table
    id: {
      type: DataTypes.INTEGER, // Data type is integer
      allowNull: false, // Attribute cannot be null
      primaryKey: true, // Attribute is the primary key
      autoIncrement: true, // Attribute automatically increments
    },
    // Define the tag_name attribute
    tag_name: {
      type: DataTypes.STRING, // Data type is string
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
