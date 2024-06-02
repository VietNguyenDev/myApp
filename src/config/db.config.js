import dotenv from "dotenv";

dotenv.config();

const databaseConfig = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PWD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
};

export default databaseConfig;
