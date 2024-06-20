import { Sequelize } from "sequelize";
import sequelize from "./db.js";
import Category from "./categories.model.js";
import Comment from "./comments.model.js";
import Favorite from "./favorite.model.js";
import OrderDetail from "./orderDetail.model.js";
import OrderItem from "./orderItem.model.js";
import Product from "./products.model.js";
import ShippingDetail from "./shippingDetail.model.js";
import User from "./users.model.js";
import Payment from "./payment.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.models = {};
db.models.Category = Category;
db.models.Comment = Comment;
db.models.Favorite = Favorite;
db.models.OrderItem = OrderItem;
db.models.OrderDetail = OrderDetail;
db.models.Product = Product;
db.models.ShippingDetail = ShippingDetail;
db.models.User = User;
db.models.Payment = Payment;

//connect to db
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db;
