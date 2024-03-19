import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTotal: {
      type: DataTypes.INTEGER,
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
    modelName: "cart",
    timestamps: false,
  }
);

Cart.associate = (models) => {
  Cart.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
  Cart.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default Cart;
