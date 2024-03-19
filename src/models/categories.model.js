import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "categories",
    timestamps: false,
  }
);

export default Category;
