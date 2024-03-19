import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const OrderDetail = sequelize.define(
  "order_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shippingId: {
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
    modelName: "orders",
    timestamps: false,
  }
);

OrderDetail.associate = (models) => {
  OrderDetail.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  OrderDetail.belongsTo(models.Shipping, {
    foreignKey: "shippingId",
    as: "shipping",
  });

  OrderDetail.belongsTo(models.OrderDetail, {
    foreignKey: "orderId",
    as: "order_item",
  });
};
export default OrderDetail;
