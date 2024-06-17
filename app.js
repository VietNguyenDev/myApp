import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

//import routes
import productRoutes from "./src/https/routes/product.routes.js";
import userRoutes from "./src/https/routes/user.routes.js";
import categoryRoutes from "./src/https/routes/category.routes.js";
import favoriteRoutes from "./src/https/routes/favorite.routes.js";
import commentRoutes from "./src/https/routes/comment.routes.js";
import OrderItem from "./src/https/routes/orderItem.routes.js";
import authRoutes from "./src/https/routes/auth.routes.js";
import orderRoutes from "./src/https/routes/order.routes.js";

const app = express();

dotenv.config({ path: ".env" });

//config cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer();
//all routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orderItem", OrderItem);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
