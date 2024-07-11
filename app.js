import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//import routes
import productRoutes from "./src/https/routes/product.routes.js";
import userRoutes from "./src/https/routes/user.routes.js";
import categoryRoutes from "./src/https/routes/category.routes.js";
import favoriteRoutes from "./src/https/routes/favorite.routes.js";
import commentRoutes from "./src/https/routes/comment.routes.js";
import OrderItem from "./src/https/routes/orderItem.routes.js";
import authRoutes from "./src/https/routes/auth.routes.js";
import orderRoutes from "./src/https/routes/order.routes.js";
import shippingRoutes from "./src/https/routes/shipping.routes.js";
import paymentRoutes from "./src/https/routes/payment.routes.js";
import cookieSession from "cookie-session";

const app = express();

dotenv.config({ path: ".env" });

//config cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "This is a sample API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000", // Thay đổi URL tùy thuộc vào ứng dụng của bạn
      },
    ],
  },
  apis: ["./src/https/routes/*.routes.js"], // Đường dẫn đến các file định nghĩa route của bạn
};

const specs = swaggerJSdoc(options);

// Thiết lập Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//config passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
      clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

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
app.use("/api/shipping", shippingRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
