import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Favorite = sequelize.define(
  "favorites",
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
    modelName: "favorites",
    timestamps: false,
  }
);

Favorite.associate = (models) => {
  Favorite.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
  Favorite.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};
export default Favorite;
