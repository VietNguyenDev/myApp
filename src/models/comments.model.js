import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Comment = sequelize.define(
  "comments",
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
    content: {
      type: DataTypes.TEXT,
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
    modelName: "comments",
    timestamps: false,
  }
);

Comment.associate = (models) => {
  Comment.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
  Comment.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default Comment;
