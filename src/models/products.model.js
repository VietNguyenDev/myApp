import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCode: {
      type: DataTypes.STRING,
    },
    productImg: {
      type: DataTypes.TEXT,
    },
    productSize: {
      type: DataTypes.STRING,
    },
    productColor: {
      type: DataTypes.STRING,
    },
    productDescription: {
      type: DataTypes.TEXT,
    },
    sellingPrice: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
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
    modelName: "products",
    timestamps: false,
  }
);

Product.associate = (models) => {
  Product.belongsTo(models.Category, {
    foreignKey: "categoryId",
    as: "category",
  });
  Product.hasMany(models.Comment, {
    foreignKey: "productId",
    as: "comments",
  });
  Product.hasMany(models.Favorite, {
    foreignKey: "productId",
    as: "favorites",
  });
  Product.hasMany(models.Cart, {
    foreignKey: "productId",
    as: "carts",
  });
};

export default Product;
