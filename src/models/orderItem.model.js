import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
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
  },
  {
    sequelize,
    modelName: "order_item",
    timestamps: false,
  }
);

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
};
export default OrderItem;
