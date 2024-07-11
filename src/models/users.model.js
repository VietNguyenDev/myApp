import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
    gender: {
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
    modelName: "users",
    timestamps: false,
  }
);

export default User;
