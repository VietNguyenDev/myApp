import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Payment = sequelize.define(
  "payment",
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "payment",
    timestamps: false,
  }
);

Payment.associate = (models) => {
  Payment.belongsTo(models.OrderDetail, {
    foreignKey: "orderId",
  });
  Payment.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

export default Payment;
