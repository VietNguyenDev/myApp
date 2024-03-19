import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const ShippingDetail = sequelize.define(
  "shipping_detail",
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
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
    modelName: "shipping_detail",
    timestamps: false,
  }
);

ShippingDetail.associate = (models) => {
  ShippingDetail.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default ShippingDetail;
